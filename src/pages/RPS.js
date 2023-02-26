import React, { useEffect, useState } from "react";
import { Icon1, Icon2, Icon3, Loader } from "../assets";
import { GameHeader } from "../components";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/constants";
import { Link, useParams } from "react-router-dom";
import { sha256 } from "js-sha256";
import axios from "axios";
import hexToBytes from "../utils/HexToByte";
const { ethers } = require("ethers");

const RPS = () => {
  const params = useParams();
  // const { isWeb3Enabled, account } = useMoralis();
  const [account, setAccount] = useState("");
  const [random, setRandom] = useState("");

  const [userA, setUserA] = useState("");
  const [userB, setUserB] = useState("");
  const [userId, setUserId] = useState("");
  const [optionId, setoptionId] = useState("");
  const [oppState, setOppState] = useState("");
  const [isU2Joined, setIsU2Joined] = useState();

  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/tJhWcjDo8S2sN0580yBZ5ssyf-wE0lnr"
    // "https://app.zeeve.io/shared-api/poly/15bc381b18dfc5b19de35b637102934ce42663b707fc0460/"
  );

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );
  // console.log(account);
  useEffect(() => {
    const getProofDetails = async () => {
      const details = await contract.proof(68481);
      // console.log("proof:" + details);
    };
    getProofDetails();
    const data = {
      jsonrpc: "2.0",
      method: "generateIntegers",
      params: {
        apiKey: "124d2ad2-b620-47e4-ac18-31b0f379a4d5",
        n: 1,
        min: 1,
        max: 1e9,
        replacement: false,
      },
      id: 1,
    };
    const getRandom = async () => {
      await axios
        .post("https://api.random.org/json-rpc/2/invoke", data)
        .then((response) => {
          // console.log(response.data.result.random.data[0]);
          setRandom(response.data.result.random.data[0]);
        });
    };
    getRandom();
  }, []);

  useEffect(() => {
    const metaMaskProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = metaMaskProvider.getSigner();

    const getUserProof = async () => {
      const details = await contract.pair(params.id);
      let account = await signer.getAddress();
      console.log(details);

      if (account && details) {
        console.log(account, details[0]);
        if (account == (await details[0])) {
          setUserA(account);
          setUserId("A");

          details.B ? setOppState(true) : setOppState(false);
          console.log(oppState);
        } else {
          console.log("Hello");
          if (account == (await details.B)) {
            setUserB(account);
            setUserA(details.A);
          } else {
            setUserId("C");
          }
        }
      }
    };
    getUserProof();
  }, []);

  const setHash = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    let hash = sha256("1" + random);
    console.log(
      params.id,
      random,
      await hash,
      typeof params.id,
      typeof (await hexToBytes(hash))
    );
    const tx = await contract.choose(
      parseInt(params.id),
      await hexToBytes(hash)
    );
  };

  return (
    <div className="bg-[#1A1B1F] h-screen w-[100vw] text-white">
      <GameHeader />

      <div className="game-container mx-auto mt-10 h-[500px] w-[700px] bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-500">
        <h2 className="text-[2rem] font-bold text-center mt-5 mb-10">
          Rock Paper Scissor
        </h2>
        <div className="choice-container flex gap-5 px-7">
          <div className="w-1/2">
            <div className=" h-[220px]  bg-[#32333B] rounded-3xl flex justify-center items-center">
              <Icon3 className="w-32" />
            </div>
            <div className="my-3 ml-4">Select Option</div>
            <div className="select-container flex w-[100%] justify-around">
              <div
                onClick={() => setHash()}
                className="w-[70px] h-[70px] hover:bg-[#43454F] rounded-xl bg-[#32333B] flex justify-center items-center border border-gray-500"
              >
                <Icon1 className="w-8" />
              </div>
              <div className="w-[70px] h-[70px] hover:bg-[#43454F] rounded-xl bg-[#32333B] flex justify-center items-center border border-gray-500">
                <Icon2 className="w-9" />
              </div>
              <div className="w-[70px] h-[70px] hover:bg-[#43454F] rounded-xl bg-[#32333B] flex justify-center items-center border border-gray-500">
                <Icon3 className="w-7" />
              </div>
            </div>
          </div>
          <div className=" h-[220px] w-1/2 bg-[#32333B] rounded-3xl ">
            {!oppState ? (
              <div className=" h-[100%] flex justify-center items-center">
                {/* <Loader className="w-16 absolute" /> */}
                <p className="">Other user has not joined...</p>
              </div>
            ) : (
              <div className=" h-[100%] flex justify-center items-center">
                <p className="text-center mx-6">
                  Other user has joined, please choose an options!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPS;
