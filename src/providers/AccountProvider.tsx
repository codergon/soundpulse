import React, { useState } from "react";
import { useLargeStorageState } from "hooks/useLargeStorageState";

export default function AccountProvider(props: AccountProviderProps) {
  const [[isFetchingAcct, account], setAccount] =
    useLargeStorageState<string>("userData");

  return (
    <AccountContext.Provider
      value={{
        account,
        isAuthenticating: isFetchingAcct,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
}

interface AccountContext {
  account: string | null;
  isAuthenticating: boolean;
}

const AccountContext = React.createContext({} as AccountContext);

type AccountProviderProps = {
  children: React.ReactNode;
};

export function useAccount() {
  const value = React.useContext(AccountContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAccount must be wrapped in a <AccountProvider />");
    }
  }
  return value;
}
