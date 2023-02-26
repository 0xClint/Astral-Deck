export const CONTRACT_ADDRESS = "0x3975289354d30B52E20E2222044f1f93984553dd";
export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_proof",
        type: "bytes32",
      },
    ],
    name: "choose",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
    ],
    name: "exit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "reqdStake",
        type: "uint256",
      },
    ],
    name: "NotCorrectStake",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
    ],
    name: "gameGenerated",
    type: "event",
  },
  {
    inputs: [],
    name: "generatePair",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_cid",
        type: "string",
      },
    ],
    name: "getReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
    ],
    name: "join",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "usr",
        type: "uint256",
      },
    ],
    name: "penalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "option",
        type: "string",
      },
      {
        internalType: "string",
        name: "rndm",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "opt",
        type: "uint256",
      },
    ],
    name: "verify",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "cid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "data",
    outputs: [
      {
        internalType: "uint256",
        name: "optionA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "optionB",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
    ],
    name: "getResult",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "opt",
        type: "string",
      },
      {
        internalType: "string",
        name: "rndm",
        type: "string",
      },
    ],
    name: "hasher",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pair",
    outputs: [
      {
        internalType: "address payable",
        name: "A",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "B",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stake",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "proof",
    outputs: [
      {
        internalType: "bytes32",
        name: "proofA",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "proofB",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
