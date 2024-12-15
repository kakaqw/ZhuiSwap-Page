import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddLiquidityCard } from "./add-liquidity-card";

export function PoolCard() {
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(false);

  if (isAddingLiquidity) {
    return <AddLiquidityCard onBack={() => setIsAddingLiquidity(false)} />;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Pool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add liquidity to receive LP tokens
        </p>
        <Button className="w-full" onClick={() => setIsAddingLiquidity(true)}>
          Add Liquidity
        </Button>
      </CardContent>
    </Card>
  );
}
