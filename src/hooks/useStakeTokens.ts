import { useContractFunction, useEthers, useTokenBalance } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers";
import { Contract } from "@ethersproject/contracts"
import { utils } from "ethers"
import { useEffect, useState } from "react";

export const useStakeTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const TokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    // first create an interface, so that you can make a contract.
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(TokenFarmAddress, tokenFarmInterface)

    // ERC20 interface and contract
    const erc20abi = ERC20.abi
    const erc20Interface = new utils.Interface(erc20abi)
    const erc20contract = new Contract(tokenAddress, erc20Interface)

    // we need to approve tokens first.
    // then we need something which would facilitate staking of tokens.

    // send and state are UseDapp's functionalities
    const { send: approveERC20Send, state: approveandStakeERC20state } =
        useContractFunction(erc20contract, "approve", { transactionName: "Approve ERC20 transfer" })
    const approveAndStake = (amount: string) => {
        SetAmountToStake(amount)
        return approveERC20Send(TokenFarmAddress, amount)
    }
    const { send: stakeSend, state: stakeState } = useContractFunction(tokenFarmContract, "stakeTokens", { transactionName: "Stake Tokens" })
    const [amountToStake, SetAmountToStake] = useState("0")

    // useEffect executes function inside ( if statement in this case ) once the elements in the array (after the function) 
    // in useEffect change. For Ex. this useEffect comes into play when any of approveandStakeERC20state, amountToStake, tokenAddress changes.
    useEffect(() => {
        if (approveandStakeERC20state.status === "Success") {
            // Stake function -> just like stakeTokens function in TokenFarm.so l
            stakeSend(amountToStake, tokenAddress)
        }

    }, [approveandStakeERC20state, amountToStake, tokenAddress])

    const [state, setState] = useState(approveandStakeERC20state)

    useEffect(() => {
        if (approveandStakeERC20state.status === "Success") {
            setState(stakeState)
        } else {
            setState(approveandStakeERC20state)
        }
    }, [approveandStakeERC20state, stakeState])

    return { approveAndStake, state }
}