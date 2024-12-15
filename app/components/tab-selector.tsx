import { Button } from "@/components/ui/button";

interface TabSelectorProps {
  activeTab: "swap" | "pool";
  onTabChange: (tab: "swap" | "pool") => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex space-x-2 mb-4 w-full max-w-md">
      <Button
        className="flex-1"
        variant={activeTab === "swap" ? "default" : "outline"}
        onClick={() => onTabChange("swap")}
      >
        Swap
      </Button>
      <Button
        className="flex-1"
        variant={activeTab === "pool" ? "default" : "outline"}
        onClick={() => onTabChange("pool")}
      >
        Pool
      </Button>
    </div>
  );
}
