import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tokens = [
  { symbol: "ETH", name: "Ethereum", balance: 1.5 },
  { symbol: "USDC", name: "USD Coin", balance: 1000 },
  { symbol: "DAI", name: "Dai", balance: 1000 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", balance: 0.05 },
];

export function AddLiquidityCard({ onBack }: { onBack: () => void }) {
  const [token1, setToken1] = useState(tokens[0]);
  const [token2, setToken2] = useState(tokens[1]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <CardTitle className="text-2xl font-bold">Add Liquidity</CardTitle>
        <div className="w-4" /> {/* Spacer for alignment */}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="token1-amount">Token 1</Label>
            <span className="text-sm text-gray-500">
              Balance: {token1.balance.toFixed(4)} {token1.symbol}
            </span>
          </div>
          <div className="flex space-x-2">
            <Input id="token1-amount" placeholder="0.0" className="flex-grow" />
            <Select
              value={token1.symbol}
              onValueChange={(value) =>
                setToken1(tokens.find((t) => t.symbol === value) || tokens[0])
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
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="token2-amount">Token 2</Label>
            <span className="text-sm text-gray-500">
              Balance: {token2.balance.toFixed(4)} {token2.symbol}
            </span>
          </div>
          <div className="flex space-x-2">
            <Input id="token2-amount" placeholder="0.0" className="flex-grow" />
            <Select
              value={token2.symbol}
              onValueChange={(value) =>
                setToken2(tokens.find((t) => t.symbol === value) || tokens[1])
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
        <Button className="w-full">Add Liquidity</Button>
      </CardContent>
    </Card>
  );
}
