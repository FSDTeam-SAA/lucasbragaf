"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Company {
  image: string;
}

const companies: Company[] = [
  { image: "/l1.png" },
  { image: "/l2.png" },
  { image: "/l3.png" },
  { image: "/l4.png" },
  { image: "/l5.png" },
  { image: "/l6.png" },
];

export default function Companies() {
  const [key, setKey] = useState<number>(0);
  const times: number = 10;

  let repeated: Company[] = [];
  for (let i = 0; i < times; i++) {
    repeated = repeated.concat(companies);
  }

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setKey((prev: number) => prev + 1);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="projects"
      className="lg:pt-12 pt-5 bg-[#1F1F1F] overflow-hidden"
    >
      <div className="container mx-auto px-2 lg:px-0">
        <div className="lg:mb-12 mb-6 text-center lg:text-start">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-4xl font-semibold text-white lg:mb-16 mb-8 text-center capitalize title"
          >
            Proudly Partnered with These Companies
          </motion.h2>

          <div className="relative w-full overflow-hidden">
            <motion.div
              key={key}
              className="flex items-center gap-8 md:gap-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 60,
              }}
              style={{ width: "max-content" }}
            >
              {repeated.map((company, index) => (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={company.image}
                    width={120}
                    height={80}
                    alt={`Company`}
                    className="w-20 md:w-28 h-auto object-contain opacity-80 hover:opacity-100 transition"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
