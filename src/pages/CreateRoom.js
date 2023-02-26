import React, { useState } from "react";
import { GameHeader } from "../components";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/constants";
import { Loader } from "../assets";
import { useNavigate, Link } from "react-router-dom";
const { ethers } = require("ethers");

const CreateRoom = () => {
  const [isCreateRoom, setIsCreateRoom] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isJoinRoom, setIsJoinRoom] = useState(false);
  const [isAlreadyJoinRoom, setAlreadyIsJoinRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  // const provider = new ethers.providers.JsonRpcProvider(
  //   // "https://polygon-mumbai.g.alchemy.com/v2/tJhWcjDo8S2sN0580yBZ5ssyf-wE0lnr"
  //   "https://app.zeeve.io/shared-api/poly/15bc381b18dfc5b19de35b637102934ce42663b707fc0460/"
  // );
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  async function getRoomId() {
    const options = { value: ethers.utils.parseEther("0.00001") };
    const tx = await contract.generatePair(options);
    const receipt = await tx.wait();
    console.log(receipt);
    // console.log(Number(receipt.logs[0].topics[1]));
    setRoomId(Number(receipt.logs[1].topics[1]));
  }

  async function joinId() {
    const options = { value: ethers.utils.parseEther("0.00001") };
    console.log(parseInt(roomId), typeof parseInt(roomId));
    try {
      await contract.join(parseInt(roomId), options);
      navigate(`/games/rps/${roomId}`);
    } catch (e) {
      console.log(e);
      setAlreadyIsJoinRoom(true);
      navigate(`/games/rps/${roomId}`);
    }
  }

  const createRoom = async () => {
    setLoader(true);
    await getRoomId();
    setIsCreateRoom(true);
    setLoader(false);
  };
  const joinRoom = async () => {
    setLoader(true);
    await joinId();

    setLoader(false);
  };

  //   console.log(roomId);
  return (
    <div className="bg-[#1A1B1F] h-screen w-[100vw] text-white">
      {loader && (
        <div className="loaderContainer absolute w-[100vw] h-[100vh] flex justify-center items-center z-10">
          <div className=" w-[100%] absolute h-[100%] bg-black opacity-40 -z-5"></div>
          <Loader className="z-10 w-20" />
        </div>
      )}
      {isCreateRoom && (
        <div className="loaderContainer absolute w-[100vw] h-[100vh] flex justify-center items-center z-10">
          <div className=" w-[100%] absolute h-[100%] bg-black opacity-40 -z-5"></div>
          <div className="z-10 h-[280px] w-[320px] rounded-3xl bg-[#27292E] border border-gray-500">
            <h2 className=" font-extrabold text-[2rem] text-center my-7">
              Room Created
            </h2>

            <div className="flex flex-col justify-center items-center gap-2">
              <p>Room Id:</p>
              <div className="bg-[#27292E] py-2 px-3 rounded-xl border border-gray-500 mb-5">
                {roomId ? roomId : ""}
              </div>

              <button
                onClick={() => navigate(`/games/rps/${roomId}`)}
                className="bg-[#2A313E] hover:bg-[#353E4E]  text-[1.2rem] py-2 px-4 rounded-lg w-[160px] "
              >
                Go to Room
              </button>
            </div>
          </div>
        </div>
      )}
      {isJoinRoom && (
        <div className="loaderContainer absolute w-[100vw] h-[100vh] flex justify-center items-center z-10">
          <div className=" w-[100%] absolute h-[100%] bg-black opacity-40 -z-5"></div>
          <div className="z-10 h-[280px] w-[320px] rounded-3xl bg-[#27292E] border border-gray-500">
            <h2 className=" font-extrabold text-[2rem] text-center my-7">
              Join Room
            </h2>

            <div className="flex flex-col justify-center items-center gap-2">
              <p>Room Id:</p>
              <input
                type="text"
                value={roomId}
                className="bg-[#27292E] py-2 px-3 rounded-xl border border-gray-500 mb-1"
                onChange={(e) => setRoomId(e.target.value)}
              ></input>
              {isAlreadyJoinRoom && <p>Already joined room!</p>}
              <button
                onClick={() => joinRoom()}
                className="bg-[#2A313E] hover:bg-[#353E4E]  text-[1.2rem] py-2 px-4 rounded-lg w-[160px] "
              >
                Go to Room
              </button>
            </div>
          </div>
        </div>
      )}
      <GameHeader />
      <div className="game-container mx-auto -z-1 mt-10 h-[440px] w-[700px] rounded-3xl bg-[#27292E] border border-gray-500">
        <h2 className="text-[2rem] font-bold text-center m-5 my-8">
          Create or Join Room!
        </h2>
        <div className="flex justify-between mx-12 mb-10 ">
          <p className="">Contract Address:</p>
          <p className="">{CONTRACT_ADDRESS}</p>
        </div>
        <div className="choice-container flex gap-5 px-7">
          <div className="w-1/2">
            <div
              onClick={() => createRoom()}
              className=" h-[220px]  bg-[#32333B] rounded-3xl flex justify-center items-center text-[2rem] font-bold text-center hover:bg-[#43454F] cursor-pointer"
            >
              Create
              <br /> Room
            </div>
          </div>
          <div className="  w-1/2 " onClick={() => setIsJoinRoom(true)}>
            <h2 className="h-[220px]  bg-[#32333B] rounded-3xl flex justify-center items-center text-[2rem] font-bold text-center hover:bg-[#43454F] cursor-pointer">
              Join
              <br /> Room
            </h2>
            {/* <div className=" flex flex-col gap-2 justify-center items-center">
              <p>Paste the code</p>
              <input
                type="text"
                className="rounded  bg-transparent bg-gray-400 border text-[1.1rem] w-32 py-1 px-3 border-white"
                value={"sfaf"}
              ></input>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
