"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Prize } from "@/types/Prize";

const variants = {
  open: { opacity: 1, display: "block" },
  closed: { opacity: 0, display: "none" },
};

export default function Home() {
  const [showScreen, setShowScreen] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [spin, setSpin] = useState(false);
  const [prize, setPrize] = useState<Prize>();

  const showPrize = async () => {
    setSpin(true);
    await fetchPrize();
    setTimeout(() => {
      setShowDialog(true);
      setSpin(false);
    }, 3000);
  };

  const showMain = () => {
    setShowScreen(true);
    setShowDialog(false);
  };

  const fetchPrize = async () => {
    try {
      const res = await fetch("/api/prizes", {
        method: "POST",
      });
      const data = (await res.json()).data as Prize;
      setPrize(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="relative w-screen h-screen">
      <motion.div animate={showScreen ? "open" : "closed"} variants={variants}>
        <div className="relative w-screen h-screen z-10">
          <img
            className="absolute top-0 left-0 w-full h-full"
            src="/img/main.webp"
            alt="bg"
          />
          <Button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[274px]"
            variant="default"
            onClick={() => setShowScreen(false)}
          >
            Играть
          </Button>
        </div>
      </motion.div>

      <motion.div animate={showScreen ? "closed" : "open"} variants={variants}>
        <div className="page w-screen h-screen">
          <div className="page-title">
            <img src="/img/logo.svg" alt="" />
          </div>
          <div className="wheel">
            <div className="wheel-triangle">
              <img src="/img/triangle.svg" alt="" />
            </div>
            <div className={cn("wheel-wheel", { active: spin })}>
              <img src="/img/wheel.svg" alt="" />
            </div>
            <Button onClick={() => showPrize()} className="wheel-btn">
              Вращать
            </Button>
          </div>
        </div>
      </motion.div>

      <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
        <DialogOverlay>
          <DialogTitle />
          <DialogDescription />
          <DialogContent className="max-h-[1200px] rounded-[24px] overflow-hidden">
            <div className="h-[260px] flex items-center justify-center bg-gradient-to-b from-[#7801FD] to-[#480197]">
              <Image
                src="/img/check.png"
                width={216}
                height={216}
                alt="check"
              />
            </div>
            <div className="pt-[40px] pb-[100px] bg-white flex flex-col text-center justify-center items-center">
              <div className="text-[72px] font-semibold">
                Ура! <br /> Вы получили
              </div>
              <div className=" my-6 py-5 px-10 inline text-[54px] font-semibold text-[#9F53F4] bg-[#9F53F4]/15 leading-tight rounded-[24px]">
                {prize?.title || "Стикерпак"}
              </div>
              <Button
                className="w-[330px]"
                variant="outline"
                onClick={() => showMain()}
              >
                В главное меню
              </Button>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </div>
  );
}
