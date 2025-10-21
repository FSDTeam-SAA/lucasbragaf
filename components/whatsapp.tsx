import React from "react";
import { MessageCircle } from "lucide-react"; // Lucide WhatsApp-like icon
import Link from "next/link";
import Image from "next/image";

export default function Whatsapp() {
  return (
    <div className="fixed bottom-10 right-8 z-50">
      <Link
        href="https://wa.me/+4407514996775"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <Image src="/whatsapp.png" alt="WhatsApp" width={50} height={50} />
      </Link>
    </div>
  );
}
