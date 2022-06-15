import { atom } from "recoil";

interface IWallet {
  name: string;
  address: string;
  balance: number;
  link: string;
  mluBalance: number;
  firstCheck: boolean;
}

interface Network {
  chain: string;
  eventServer: string;
  fullNode: string;
  solidityNode: string;
}

interface IState {
  isLogged: boolean | undefined;
  network?: Network | undefined;
  isMainNet?: boolean;
  wallet: IWallet;
}

export const initialState: IState = {
  isLogged: false,
  wallet: {
    name: "",
    address: "",
    balance: 0,
    link: "false",
    mluBalance: 0,
    firstCheck: false,
  },
};

export const ACCOUNT_STATE = atom({
  key: "ACCOUNT_STATE",
  default: initialState,
});
