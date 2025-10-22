import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Whatsapp() {
  return (
    <div className="fixed bottom-5 lg:bottom-10 right-4 lg:right-8 z-50 flex flex-col items-center space-y-2 bg-transparent">
      {/* Show text only on md and larger */}
      <span className="hidden md:block text-white bg-[#25D366]/80 px-3 py-1 rounded-full text-sm font-medium shadow-md">
        Let&apos;s Chat
      </span>

      <Link
        href="https://wa.me/+4407514996775"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          width={50}
          height={50}
          className="shadow-lg hover:scale-110 transition-transform duration-300"
        />
      </Link>
    </div>
  );
}
