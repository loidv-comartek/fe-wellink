import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import "./App.css";
import { ACCOUNT_STATE } from "./state/account";

function SendTrx() {
  const { wallet } = useRecoilValue(ACCOUNT_STATE);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(1);

  const sendTrx = async () => {
    const tradeObj = await window.welWeb.transactionBuilder.sendTrx(
      toAddress,
      amount,
      wallet.address,
      1
    );
    console.log("transactionBuilder", tradeObj);

    const signedTxn = await window.welWeb.trx.sign(tradeObj);
    console.log("signedTxn", signedTxn);

    const receipt = await window.welWeb.trx.sendRawTransaction(signedTxn);
    console.log("receipt", receipt);
  };

  return (
    <>
      <div>
        <h2>Send TRX</h2>
        <b>To Address:</b>
        <input
          type="text"
          name="to_address"
          onChange={(e) => setToAddress(e.target.value)}
        />
        <button onClick={sendTrx}>Send</button>
      </div>
    </>
  );
}

export default SendTrx;
