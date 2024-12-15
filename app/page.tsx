"use client";

import { useState } from "react";
import { Header } from "./components/header";
import { SwapCard } from "./components/swap-card";
import { PoolCard } from "./components/pool-card";
import { TabSelector } from "./components/tab-selector";

export default function SwapInterface() {
  const [activeTab, setActiveTab] = useState<"swap" | "pool">("swap");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "swap" ? <SwapCard /> : <PoolCard />}
      </div>
    </div>
  );
}
