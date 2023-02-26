import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { AstronautIcon, UserIcon } from "../assets";
// import { TurnOff, UserIcon } from "../assets";

const ConnectWallet = () => {
  const {
    enableWeb3,
    isWeb3Enabled,
    account,
    deactivateWeb3,
    Moralis,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;

    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("connected")
    ) {
      enableWeb3();
    }
  }, []);

  useEffect(() => {
    // Moralis
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found");
      }
    });
  }, []);
  return (
    <div>
      {account ? (
        <div className="flex gap-2 justify-center items-center text-white cursor-pointer">
          <AstronautIcon />
          <div className="bg-[#232429] py-1 px-3 rounded-xl hover:bg-[#32333B]">
            {account.slice(0, 7)}... {account.slice(account.length - 4)}
          </div>
        </div>
      ) : (
        <button
          className="connect bg-[#232429] w-full py-3 px-5 font-bold text-white rounded-2xl hover:bg-[#32333B]"
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected");
            }
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
