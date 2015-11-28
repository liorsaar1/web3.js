module.exports = {
  getInstance: function (_web3) {
    return _web3.eth.contract(nameRegAbi).at('0x084f6a99003dae6d3906664fdbf43dd09930d0e3');
  },
};



var nameRegAbi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "name",
        "type": "bytes32"
      }
    ],
    "name": "addressOf",
    "outputs": [
      {
        "name": "addr",
        "type": "address"
      }
    ],
    "type": "function"
  }
];

// function getNameReg(_web3) {
//     return _web3.eth.contract(nameRegAbi).at('0x084f6a99003dae6d3906664fdbf43dd09930d0e3');
// }
