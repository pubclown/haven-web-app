import * as fs from "fs";
import { config } from "./localNode/config/config";
import { getWalletPath } from "./wallets/walletPaths";

export const getAvailableWallets = (): {
  storePath: string;
  wallets: string[];
} => {
  const walletPath: string = getWalletPath();
  let availableWallets: string[];

  const files = fs.readdirSync(walletPath);

  availableWallets = files
    .filter((file) => file.endsWith(".keys"))

    .map((walletName) => {
      walletName = walletName.replace(".keys", "");
      return walletName;
    });

  return {
    storePath: walletPath,
    wallets: availableWallets,
  };
};
