import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { store } from "../Store";
import { tokenBalance } from "../interface";

export function Header() {
  const [wallet, setWallet] = useState<string | null>(null);

  //连接钱包
  const connect = async () => {
    if (window.ethereum) {
      try {
        // 请求用户连接 MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // 获取钱包 provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        store.setProvider(provider);

        const signer = await provider.getSigner(); // 获取签名

        // 设置钱包的地址（这里你选择显示后四位）
        store.setWalletAddress(signer.address);
        setWallet(signer.address.slice(-4));

        getTokenBalanceForWallet();
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  //获取WL token的余额
  const getTokenBalanceForWallet = async () => {
    const WLAddress = store.getWLAddress(); // 获取WL地址

    //遍历添加WL token的余额
    WLAddress.forEach(async (token) => {
      const contract = new ethers.Contract(
        token,
        store.abiERC20,
        store.provider
      );

      const tokenInfo: tokenBalance = {
        symbol: await contract.symbol(),
        name: await contract.name(),
        balance: await contract.balanceOf(store.walletAddress),
      };

      store.setTokenBalance(tokenInfo);
    });
  };

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
      <div className="text-2xl font-bold text-primary">ZhuiSwap</div>
      <Button onClick={connect}>{wallet ? wallet : "Connect"}</Button>
    </header>
  );
}
