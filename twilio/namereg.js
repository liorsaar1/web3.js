module.exports = {
  getContract: function (_web3) {
    return _web3.eth.contract(nameRegAbi);
  },
  getInstance: function (_web3) {
    return this.getContract(_web3).at('0x084f6a99003dae6d3906664fdbf43dd09930d0e3');
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
