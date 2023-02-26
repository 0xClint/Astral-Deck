import React from "react";
import { Navbar, Sidebar } from "../components";
import { NavLink, useParams } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="bg-[#1A1B1F] h-screen w-[100vw] flex">
      <Sidebar />
      <div className="w-[100%]">
        <Navbar />
        <div className="text-white flex justify-between">
          <div className="w-[100%] p-10 ">
            <div className=" h-80 flex  justify-center items-center bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-500">
              <div className="w-3/4 text-center">
                <h2 className="text-[4rem] font-bold">Astral Deck</h2>
                <p>Fair exchange in apps on Blockchain</p>
              </div>
              <img
                src={require("../assets/astronaut.png")}
                className="h-96 -translate-y-[33px]"
              ></img>
            </div>
            <div className="my-8 text-[1.5rem] font-semibold">
              <h2 className="mb-5">Apps</h2>
              <div className="apps-container">
                <NavLink to="/games/room">
                  <div className="w-80 h-40 flex justify-center items-center bg-gray-400 rounded-[50px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-500">
                    Rock Paper Scissors
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="w-96 mr-6 h-[60vh] bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-500">
            <h2 className="m-5 text-[1.2rem]">History</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
