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
  const [hashA, setHashA] = useState("");
  const [hashB, setHashB] = useState("");
  const [chosen, setChosen] = useState(false);
  const [result, setResult] = useState("");
  const [successResult, setSuccessResult] = useState(false);

  const [userA, setUserA] = useState("");
  const [userB, setUserB] = useState("");
  const [userId, setUserId] = useState("");
  const [optionId, setoptionId] = useState("");
  const [oppState, setOppState] = useState("");
  const [isU2Joined, setIsU2Joined] = useState();

  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/tJhWcjDo8S2sN0580yBZ5ssyf-wE0lnr"
    // "https://app.zeeve.io/shared-api/poly/c55eb5146a590fd750f1967eb666bdec0fe45297623b5c6a/"
  );

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );
  // console.log(account);

  useEffect(() => {
    const getProofDetails = async () => {
      const details = await contract.proof(params.id);
      console.log(details);
      setHashA(details[0]);
      setHashB(details[1]);
    };
    while (
      hashA ==
        "0x0000000000000000000000000000000000000000000000000000000000000000" ||
      hashB ==
        "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) {
      getProofDetails();
    }
  }, []);

  useEffect(() => {
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
        // console.log(account, details[0]);
        if (account == (await details[0])) {
          setUserA(account);
          setUserId("A");

          details.B ? setOppState(true) : setOppState(false);
          console.log(oppState);
        } else {
          console.log("Hello");
          if (account == (await details[1])) {
            setUserB(account);
            setUserA(details[0]);
          } else {
            setUserId("C");
          }
        }
      }
    };
    getUserProof();
  }, []);

  const setHash = async (key) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    console.log(key, random, typeof key, typeof random);
    console.log(key.concat(random));
    setoptionId(key);

    let hash = sha256(key.concat(random));

    console.log(
      params.id,
      random,
      await hash,
      typeof params.id,
      await hexToBytes(hash)
    );
    if (!chosen) {
      setChosen(true);
      const tx = await contract.choose(
        parseInt(params.id),
        await hexToBytes(hash)
      );
    }

    // setChosen(true);
    // const tx = await contract.choose(
    //   7805,
    //   // await hexToBytes(
    //   "0x45a14cd878eabbf0589e6ef48fea65831901cf454c367faa56207c1ce2eb7241"
    //   // )
    // );
  };

  const verifyHash = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    console.log(
      parseInt(params.id),
      optionId,
      random.toString(),
      parseInt(optionId)
    );
    const tx = await contract.verify(
      parseInt(params.id),
      optionId,
      random.toString(),
      parseInt(optionId)
    );
    // const tx = await contract.verify(98855, "2", "841976519", 2);
  };

  const getResult = async () => {
    let data = await contract.getResult(params.id);
    setResult(data);
    setSuccessResult(true);
    console.log(data);
  };
  const getReward = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    await contract.getReward(params.id);
  };

  return (
    <div className="bg-[#1A1B1F] h-screen w-[100vw] text-white">
      {successResult && (
        <div className="loaderContainer absolute w-[100vw] h-[100vh] flex justify-center items-center z-10">
          <div className=" w-[100%] absolute h-[100%] bg-black opacity-40 -z-5"></div>
          <div className="z-10 flex flex-col justify-center items-center bg-clip-padding h-[200px] w-[500px] bg-gray-400 rounded-3xl backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-500">
            <h2 className="text-[1.2rem] font-bold">Winner Address :</h2>
            <p className="text-[1.2rem]">{result ? result : "result"}</p>
            <button
              className="bg-[#2A313E] hover:bg-[#353E4E]  text-[1.2rem] py-2 px-4 rounded-lg w-[160px] mt-3"
              onClick={() => getReward()}
            >
              Get Reward
            </button>
          </div>
        </div>
      )}
      <GameHeader />

      <div className="game-container mx-auto mt-10 h-[500px] w-[700px] bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-500">
        <h2 className="text-[2rem] font-bold text-center mt-5 mb-10">
          Rock Paper Scissor
        </h2>
        <div className="choice-container flex gap-5 px-7">
          <div className="w-1/2">
            <div className=" h-[220px]  bg-[#32333B] rounded-3xl flex justify-center items-center">
              {optionId == "1" && <Icon1 />}
              {optionId == "2" && <Icon2 />}
              {optionId == "3" && <Icon3 />}
            </div>
            <div className="my-3 ml-4">Select Option</div>

            {chosen ? (
              <div className="select-container flex w-[100%] justify-around">
                <div className="w-[70px] h-[70px] rounded-xl bg-[#812020] flex justify-center items-center border border-gray-500">
                  <Icon1 className="w-8" />
                </div>
                <div className="w-[70px] h-[70px] rounded-xl bg-[#812020] flex justify-center items-center border border-gray-500">
                  <Icon2 className="w-9" />
                </div>
                <div className="w-[70px] h-[70px] rounded-xl bg-[#812020] flex justify-center items-center border border-gray-500">
                  <Icon3 className="w-7" />
                </div>
              </div>
            ) : (
              <div className="select-container flex w-[100%] justify-around">
                <div
                  onClick={async () => {
                    await setoptionId("1");
                    await setHash("1");
                  }}
                  className="w-[70px] h-[70px] hover:bg-[#43454F] rounded-xl bg-[#32333B] flex justify-center items-center border border-gray-500"
                >
                  <Icon1 className="w-8" />
                </div>
                <div
                  onClick={() => {
                    setoptionId("2");
                    setHash("2");
                  }}
                  className="w-[70px] h-[70px] hover:bg-[#43454F] rounded-xl bg-[#32333B] flex justify-center items-center border border-gray-500"
                >
                  <Icon2 className="w-9" />
                </div>
                <div
                  onClick={() => {
                    setoptionId("3");
                    setHash("3");
                  }}
                  className="w-[70px] h-[70px] hover:bg-[#43454F] rounded-xl bg-[#32333B] flex justify-center items-center border border-gray-500"
                >
                  <Icon3 className="w-7" />
                </div>
              </div>
            )}
          </div>
          <div className=" h-[220px] w-1/2 bg-[#32333B] rounded-3xl ">
            {userId == "A" ? (
              !oppState ? (
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
              )
            ) : hashA ==
              "0x0000000000000000000000000000000000000000000000000000000000000000" ? (
              <div className=" h-[100%] flex justify-center items-center">
                <Loader className="w-16 absolute" />
                <p className="translate-y-12">Choosing...</p>
              </div>
            ) : (
              <div className=" h-[100%] flex justify-center items-center">
                {/* <Loader className="w-16 absolute" /> */}
                <p className="">
                  User has chosen:
                  <br />
                  {hashA}
                </p>
              </div>
            )}
            <div className="flex flex-col justify-center items-center gap-3 my-6">
              <button
                className="bg-[#2A313E] hover:bg-[#353E4E]  text-[1.2rem] py-2 px-4 rounded-lg w-[90%]"
                onClick={() => verifyHash()}
              >
                Verify
              </button>
              <button
                className="bg-[#2A313E] hover:bg-[#353E4E]  text-[1.2rem] py-2 px-4 rounded-lg w-[90%]"
                onClick={() => getResult()}
              >
                Get Result
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPS;
