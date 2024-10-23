"use client";

import { Prize } from "@/types/Prize";
import { useEffect, useState } from "react";

export default function Status() {
  const [prizes, setPrizes] = useState<Prize[]>([]);

  const fetchPrizes = async () => {
    try {
      const res = await fetch("/api/prizes", {
        method: "GET",
      });
      const data = (await res.json()) as Prize[];
      setPrizes(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPrizes();
    const interval = setInterval(async () => {
      await fetchPrizes();
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-screen min-h-screen bg-[#F6F6F6] py-10 px-20">
      <div className="flex items-center justify-between">
        <img src="/img/logo.svg" alt="" />
        <div className="text-[54px] font-semibold">Призы</div>
      </div>
      <div className="grid grid-cols-5 gap-6 mt-10">
        {prizes.map((prize) => (
          <div
            key={prize.id}
            className="p-6 bg-white border-[#D5D5D5] border-2 flex flex-col gap-5"
          >
            <div className="text-xl font-semibold"> {prize.title}</div>
            <div className="mt-auto flex items-center justify-between gap-4">
              <span className="text-[#6E6E6E] text-xl">Количество</span>
              <span className="text-xl font-semibold">{prize.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
