const ethers = require('ethers')
const SNXLinkV1Abi = require('./snx-link-v1.abi.json')

module.exports = new ethers.Contract('snxlink.eth', SNXLinkV1Abi, ethers.getDefaultProvider())

