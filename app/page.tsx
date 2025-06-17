'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false); // Start exit animation
    }, 1800); // Start exit before navigation

    return () => clearTimeout(timer);
  }, []);

  // Navigate after animation finishes
  useEffect(() => {
    if (!show) {
      const navTimer = setTimeout(() => {
        router.push("/Signin");
      }, 800); // Match transition duration

      return () => clearTimeout(navTimer);
    }
  }, [show, router]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="bg-[#FE2C55] h-screen"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="bg-[#FE2C55] h-screen">
            <div>
              <Image src={'/image 348.svg'} alt="" layout="fill" objectFit="cover" />
              <div className="flex flex-col-1 justify-center h-screen">
                <Image src={'/Frame 1000006975.svg'} width={192} height={35} alt="" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}