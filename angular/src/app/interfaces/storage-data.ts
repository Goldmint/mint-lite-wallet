import {Wallet} from "./wallet";
import {UnconfirmedTx} from "./unconfirmed-tx";

export interface StorageData {
  currentWallet: number,
  wallets: Wallet[],
  unconfirmedTx: UnconfirmedTx[],
  currentNetwork: string
}