"use client";

import { useState, useEffect } from "react";
import { ArrowDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { store } from "../Store";
import { tokenBalance } from "../interface";

export const SwapCard = () => {
  const [tokens, setTokens] = useState<tokenBalance[]>([
    { symbol: "ETH", name: "Ethereum", balance: BigInt(15e17) },
    { symbol: "USDC", name: "USD Coin", balance: BigInt(100e18) },
  ]);

  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);

  const swapTokenPositions = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  useEffect(() => {
    const fetchedTokens = store.getTokenBalance();
    if (fetchedTokens && fetchedTokens.length > 0) {
      setTokens(fetchedTokens);
      setFromToken(fetchedTokens[0]);
      setToToken(fetchedTokens[0]);
    }
  }, [store.tokenBalance]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Swap</CardTitle>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="from-amount">From</Label>
              <span className="text-sm text-gray-500">
                {/* Balance: {fromToken.balance.toFixed(2)} {fromToken.symbol} */}
                Balance:{" "}
                {fromToken?.balance ? Number(fromToken.balance) / 1e18 : "0.00"}{" "}
                {fromToken?.symbol || ""}
              </span>
            </div>
            <div className="flex space-x-2">
              <Input id="from-amount" placeholder="0.0" className="flex-grow" />
              <Select
                value={fromToken.symbol}
                onValueChange={(value) =>
                  setFromToken(
                    tokens.find((t) => t.symbol === value) || tokens[0]
                  )
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={swapTokenPositions}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="to-amount">To</Label>
              <span className="text-sm text-gray-500">
                {/* Balance: {toToken.balance.toFixed(2)} {toToken.symbol} */}
                Balance:{" "}
                {toToken?.balance
                  ? Number(toToken.balance) / 1e18
                  : "0.00"}{" "}
                {toToken?.symbol || ""}
              </span>
            </div>
            <div className="flex space-x-2">
              <Input
                id="to-amount"
                placeholder="0.0"
                className="flex-grow"
                readOnly
              />
              <Select
                value={toToken.symbol}
                onValueChange={(value) =>
                  setToToken(
                    tokens.find((t) => t.symbol === value) || tokens[1]
                  )
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Swap</Button>
      </CardFooter>
    </Card>
  );
};
