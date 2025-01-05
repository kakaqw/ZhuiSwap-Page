import { ethers } from "ethers";
import { makeAutoObservable, reaction } from "mobx";
import { tokenBalance } from "./interface";

//0x272586F219e45bb66aEb64565d603E0Ec76D336d  工厂合约
//0xF47707383eB1e07F66c77C0cC1084cd41929f92A   math libaray
//0x8203B3A0982067d8224F00B44774d6cFbEF9c145   路由合约

// 定义一个 Store
class Store {
  walletAddress: string | null = null; //钱包地址
  provider: ethers.BrowserProvider | undefined; //钱包Provider
  tokenBalance: tokenBalance[] | undefined; //token余额

  constructor() {
    makeAutoObservable(this); // 自动将属性变为可观察，并生成对应的 action

    // 监听tokenBalance的变化
    reaction(
      () => this.tokenBalance,
      (tokenBalance) => {
        console.log("Token balance updated:", tokenBalance);
      }
    );
  }

  abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint256)",
  ];

  WLAddress = [
    "0xB420aF4F4F358B6ED8c47b9774250CA4Eb00f2Af", //FBTC
    "0x19174a1927A39577c12546344ba7ca11328cB0b8", //FETH
    "0x367B5F1d275Ff269E730c8EA71665fDc93f03028", //FDAI
    "0x317705c4490AdA973ef97bAAC992cFf4E8985d57", //FUSDT
  ];

  //设置钱包地址
  setWalletAddress(address: string) {
    this.walletAddress = address;
  }

  //设置钱包Provider
  setProvider(provider: ethers.BrowserProvider | undefined) {
    this.provider = provider;
  }

  //设置tokenBalance
  setTokenBalance(newToken: tokenBalance) {
    if (!this.tokenBalance) {
      this.tokenBalance = [];
    }

    // 查找是否已存在相同name的token
    const existingTokenIndex = this.tokenBalance.findIndex(
      (token) => token.name === newToken.name
    );

    if (existingTokenIndex !== -1) {
      // 找到了，更新余额
      this.tokenBalance[existingTokenIndex].balance = newToken.balance;
    } else {
      // 没找到，添加新的token
      this.tokenBalance.push(newToken);
    }

    // console.log(this.tokenBalance);
  }

  //获取WLAddress
  getWLAddress() {
    return this.WLAddress;
  }

  //获取tokenBalance
  getTokenBalance() {
    return this.tokenBalance;
  }
}

export const store = new Store();
