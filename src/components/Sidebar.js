import React from "react";
import {
  AppIcon,
  HistoryIcon,
  HomeIcon,
  LogoutIcon,
  SettingIcon,
} from "../assets";

const Sidebar = () => {
  return (
    <div
      className="navbar w-80 h-[100vh] border-r-2 border-[#484848] text-white font-bold  px-[2rem]"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <h2 className="text-[2rem] mt-5 mb-2">Astral Deck</h2>
      <div className="line-break bg-white w-[100%] h-[2px] "></div>

      <div className="app-container flex flex-col gap-3 my-10">
        <div className=" flex items-center py-2 px-2 rounded-xl gap-5 cursor-pointer hover:bg-[#32333B]">
          <div className="flex justify-center items-center w-12">
            <HomeIcon />
          </div>
          <p>Home</p>
        </div>
        <div className="flex items-center py-2 px-2 rounded-xl gap-5 cursor-pointer hover:bg-[#32333B]">
          <div className="flex justify-center items-center w-12">
            <AppIcon />
          </div>
          <p>App</p>
        </div>
        <div className="flex items-center py-2 px-2 rounded-xl gap-5 cursor-pointer hover:bg-[#32333B]">
          <div className="flex justify-center items-center w-12">
            <HistoryIcon />
          </div>
          <p>History</p>
        </div>
      </div>

      <div className="absolute botton-content bottom-0 my-14 flex flex-col gap-3 w-52">
        <div className=" flex items-center py-2 px-2 rounded-xl gap-5 cursor-pointer hover:bg-[#32333B]">
          <div className="flex justify-center items-center w-12">
            <SettingIcon />
          </div>
          <p>Setting</p>
        </div>
        <div className="flex items-center py-2 px-2 rounded-xl gap-5 cursor-pointer hover:bg-[#32333B]">
          <div className="flex justify-center items-center w-12">
            <LogoutIcon />
          </div>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
