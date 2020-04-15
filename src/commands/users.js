const {Command, flags} = require('@oclif/command')

const _ = require('lodash')
const Promise = require('bluebird')
const ethers = require('ethers')

const SNXLinkV1Contract = require('../lib/SNXLinkV1Contract')

const Table = require('cli-table')

class UsersCommand extends Command {
  async run() {
    const {flags} = this.parse(UsersCommand)

    const registeredUsersCount = await SNXLinkV1Contract.registeredUsersCount()

    if(!flags.json) this.log(`Total users: ${registeredUsersCount}`)

    const userIds = _.range(0, registeredUsersCount)

    const addresses = await Promise.all(userIds.map(i => SNXLinkV1Contract.registeredUsers(i)))

    let data = await Promise.map(addresses, (address, id) => Promise.join(
      id,
      address,
      SNXLinkV1Contract.userAutoClaimDisabled(address),
      SNXLinkV1Contract.canClaim(address),
      SNXLinkV1Contract.feesAvailable(address),
      SNXLinkV1Contract.userMaxGasPrices(address),
      SNXLinkV1Contract.userMaxFeePerClaim(address),
      SNXLinkV1Contract.userFeeWallets(address),
      (
        id,
        address,
        userAutoClaimDisabled,
        canClaim,
        [feesAvailable, rewardsAvailable],
        userMaxGasPrices,
        userMaxFeePerClaim,
        userFeeWallet,
      ) => ({
        id,
        address,
        userAutoClaimDisabled,
        canClaim,
        feesAvailable,
        rewardsAvailable,
        userMaxGasPrices,
        userMaxFeePerClaim,
        userFeeWallet,
      })))

    data = await Promise.map(data, async ({userFeeWallet, address, ...others}) => {
      const balance = await ethers.getDefaultProvider().getBalance(userFeeWallet)
      return {address, ...others, userFeeWallet, balance}
    })

    data = data.map(({
                       id,
                       address,
                       userAutoClaimDisabled,
                       canClaim,
                       feesAvailable,
                       rewardsAvailable,
                       userMaxGasPrices,
                       userMaxFeePerClaim,
                       userFeeWallet,
                       balance,
                     }) => {
      const feesAvailableEth = (Number(ethers.utils.formatEther(feesAvailable))).toFixed(2)
      const rewardsAvailableEth = (Number(ethers.utils.formatEther(rewardsAvailable))).toFixed(2)

      const userMaxFeePerClaimEth = ethers.utils.formatEther(userMaxFeePerClaim)
      const userMaxGasPricesGwei = userMaxGasPrices.div('1000000000').toString()

      const balanceEth = ethers.utils.formatEther(balance)

      return ({
        id,
        address,
        enabled: !userAutoClaimDisabled,
        canClaim,
        fees: feesAvailableEth,
        rewards: rewardsAvailableEth,
        maxGas: userMaxGasPricesGwei,
        maxFee: userMaxFeePerClaimEth,
        feeWallet: userFeeWallet,
        balance: balanceEth,
        weeks: balance.div(userMaxFeePerClaim).toString(),
      })
    })
      .map(({weeks, canClaim, ...fields}) => ({
        ...fields,
        weeks,
        isClaimable: canClaim && ((+weeks) > 0),
      }))

    let output = ''

    if(!flags.json) {
      const table = new Table({
        head: [
          'id',
          'address',
          'enabled',
          'canClaim',
          'fees (sUSD)',
          'rewards (SNX)',
          'maxGas (Gwei)',
          'maxFee (ETH)',
          'feeWallet ',
          'balance (ETH)',
          'weeks',
          'isClaimable',
        ],
      })

      table.push(...data.map(d => Object.values(d)))

      output = table.toString()
    } else {
      output = JSON.stringify(data, 0, 2)
    }

    this.log(output)
  }
}

UsersCommand.description = `List all registered users with attributes`

UsersCommand.flags = {
  json: flags.boolean({char: 'j', description: 'Print result as JSON'}),
}

module.exports = UsersCommand
