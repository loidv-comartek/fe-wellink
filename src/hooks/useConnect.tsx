import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ACCOUNT_STATE } from "../state/account";

const isMainnet = (fullNode: string) => fullNode === "https://api.nileex.io";

export default function useConnectWallet() {
  const [state, setState] = useRecoilState(ACCOUNT_STATE);

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.data.message && e.data.message.action === "tabReplyWel") {
        if (state.wallet.address !== e.data.message.data.data.address) {
          // user logout
          if (e.data.message.data.data.address === false) {
          } else {
            setState((state) => ({
              ...state,
              wallet: {
                address: e.data.message.data.data.address,
                firstCheck: false,
                balance: 0,
                link: "",
                mluBalance: 0,
                name: e.data.message.data.data.name,
              },
            }));
          }
        }
      }
      if (e.data.message && e.data.message.action === "setNode") {
        // userState.merge({
        //   isMainNet: isMainnet(e.data.message.data.node.fullNode),
        //   network: e.data.message.data.node,
        // });
      }
    });
  }, []);

  useEffect(() => {
    if (!state.isLogged) {
      const checkLoggedInInterval = setInterval(() => {
        if (window.welWeb && window.welWeb.defaultAddress.base58) {
          clearInterval(checkLoggedInInterval);
          setState({
            isLogged: true,
            network: {
              chain: "_",
              eventServer: window.welWeb.eventServer.host,
              solidityNode: window.welWeb.solidityNode.host,
              fullNode: window.welWeb.fullNode.host,
            },
            isMainNet: isMainnet(window.welWeb.fullNode.host),
            wallet: {
              address: window.welWeb.defaultAddress.base58,
              firstCheck: false,
              balance: 0,
              link: "",
              mluBalance: 0,
              name: window.welWeb.defaultAddress.name,
            },
          });
        }
      }, 100);
    }
  }, [state.isLogged]);
}
