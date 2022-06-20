import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import "./App.css";
import Asset from "./Asset";
import useConnectWallet from "./hooks/useConnect";
import Log from "./Log";
import SendTrx from "./Send";
import { ACCOUNT_STATE } from "./state/account";

function App() {
  useConnectWallet();

  const accountState = useRecoilValue(ACCOUNT_STATE);

  return (
    <div className="App">
      {accountState.isLogged ? (
        <>
          <Asset />
          <SendTrx />
        </>
      ) : (
        <>
          <h2>You are not Installed or Login Wellink </h2>
        </>
      )}

      <Log />
      <div style={{ height: 100 }}></div>
    </div>
  );
}

export default App;
