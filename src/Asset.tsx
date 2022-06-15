import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import "./App.css";
import { ACCOUNT_STATE } from "./state/account";
import ReactJson from "react-json-view";

function Asset() {
  const { wallet } = useRecoilValue(ACCOUNT_STATE);
  const [trx, setTrx] = useState({});

  useEffect(() => {
    if (wallet.address) {
      window.welWeb.trx
        .getAccount(wallet.address)
        .then((data: any) => {
          setTrx(data);
        })
        .catch(console.log);
    }
  }, [wallet.address]);
  return (
    <>
      <div>
        <h2>Address</h2>
        <div>
          <div>Name : {wallet.name}</div>
          <div>Base58 : {wallet.address}</div>
        </div>
        {trx && <ReactJson src={trx} />}
      </div>
    </>
  );
}

export default Asset;
