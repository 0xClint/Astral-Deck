import React from "react";
import { BellIcon, SearchIcon } from "../assets";
import ConnectWallet from "./ConnectWallet";

const Navbar = () => {
  return (
    <div className="navbar px-10 py-8 flex justify-between w-[100%] ">
      <div className="rounded-2xl bg-[#232429] h-12 flex justify-between focus:ring-indigo-800 text-[#9999A1] py-3 w-[500px] px-4 bg-opacity-80 bg-clip-padding">
        <input
          type="text"
          className="bg-transparent"
          //   value={"adfaf"}
        ></input>
        <SearchIcon />
      </div>
      <div className="right flex gap-8 justify-center items-center h-12 mr-10">
        <div className="h-12 w-12 rounded-full bg-[#232429] flex justify-center items-center hover:bg-[#32333B] duration-100 cursor-pointer">
          <BellIcon />
        </div>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Navbar;
