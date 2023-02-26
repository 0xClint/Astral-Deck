import React from "react";
import ConnectWallet from "./ConnectWallet";

const GameHeader = () => {
  return (
    <div className="px-14 py-6 flex justify-between w-[100%] text-white ">
      <div className="text-[2rem] font-semibold">Astral Deck</div>
      <ConnectWallet />
    </div>
  );
};

export default GameHeader;
