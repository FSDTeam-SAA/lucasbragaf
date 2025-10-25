"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CountryList from "country-list-with-dial-code-and-flag";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile devices (on client only)
  useEffect(() => {
    const checkIsMobile = () => window.innerWidth < 768;
    setIsMobile(checkIsMobile());

    // Optional: handle window resize
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile === null) return; // Don’t run until hydration

    const video = videoRef.current;
    if (!video) return;

    let fallbackTimer: NodeJS.Timeout;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      setShowFallback(false);
      clearTimeout(fallbackTimer);
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
      setShowFallback(true);
      clearTimeout(fallbackTimer);
    };

    fallbackTimer = setTimeout(() => {
      if (!videoLoaded) {
        console.warn("Fallback timer triggered");
        setShowFallback(true);
      }
    }, 2500);

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      clearTimeout(fallbackTimer);
    };
  }, [isMobile, videoLoaded]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isMobile === null) {
    // Wait until hydration to render video
    return (
      <section className="relative h-[65vh] lg:h-[75vh] flex items-center justify-center bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/digtoiyka/image/upload/v1760992377/Icone_fr75eg.png')`,
          }}
        />
      </section>
    );
  }

  const videoSrc = isMobile
    ? "https://res.cloudinary.com/digtoiyka/video/upload/f_auto:video,q_auto:good,w_800/v1761086298/New-Hero_1_cbudpp.mp4"
    : "/videos/new.mp4";

  console.log("📱 isMobile:", isMobile, "Video:", videoSrc);

  return (
    <section
      id="hero"
      className="relative lg:h-[75vh] h-[65vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        {showFallback && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/digtoiyka/image/upload/v1760992377/Icone_fr75eg.png')`,
            }}
          />
        )}

        {isMobile ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
              src="https://player.vimeo.com/video/1129854417?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute top-1/2 left-1/2 w-[177.78vh] h-screen min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
              title="HeroMobile"
            ></iframe>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            poster="https://res.cloudinary.com/digtoiyka/image/upload/v1760992377/Icone_fr75eg.png"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {(videoLoaded || showFallback) && (
          <div className="absolute inset-0 bg-black/40" />
        )}
      </div>
      {/* Hero Text & Buttons */}{" "}
      <div className="relative z-10 text-center">
        {" "}
        {videoLoaded ? (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {" "}
            <h1 className="title text-lg md:text-2xl lg:text-6xl font-semibold leading-snug text-white/90 mb-8 max-w-7xl px-5 md:px-0 mx-auto text-pretty title">
              {" "}
              London-Based Videography & Photography for the UK & Europe{" "}
            </h1>{" "}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {" "}
              <Button
                onClick={() => scrollToSection("projects")}
                variant="outline"
                size="lg"
                className="hidden lg:block bg-transparent border-white text-white hover:bg-white hover:text-neutral-950"
              >
                {" "}
                View Projects{" "}
              </Button>{" "}
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="hidden lg:block bg-transparent lg:bg-white !border-1 border-white text-white lg:text-black hover:bg-white hover:text-neutral-950"
              >
                {" "}
                Get a Quote{" "}
              </Button>{" "}
            </motion.div>{" "}
          </motion.div>
        ) : (
          <div className="w-full max-w-7xl px-5 md:px-0 mx-auto mt-44 lg:mt-[450px]">
            {" "}
            <h1 className="title text-lg md:text-2xl lg:text-6xl font-semibold leading-snug text-white/90 mb-8 text-pretty title">
              {" "}
              London-Based Videography & Photography for the UK & Europe{" "}
            </h1>{" "}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {" "}
              <Button
                onClick={() => scrollToSection("projects")}
                variant="outline"
                size="lg"
                className="hidden lg:block bg-transparent border-white text-white hover:bg-white hover:text-neutral-950"
              >
                {" "}
                View Projects{" "}
              </Button>{" "}
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="hidden lg:block bg-transparent lg:bg-white !border-1 border-white text-white lg:text-black hover:bg-white hover:text-neutral-950"
              >
                {" "}
                Get a Quote{" "}
              </Button>{" "}
            </div>{" "}
          </div>
        )}{" "}
      </div>{" "}
      {/* Mobile Button */}{" "}
      {(videoLoaded || showFallback) && (
        <div className="absolute lg:hidden bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
          <Button
            onClick={() => scrollToSection("contact")}
            size="lg"
            className="w-40 bg-transparent lg:bg-white !border-[1px] border-white text-white lg:text-black hover:bg-white hover:text-neutral-950"
          >
            Get a Quote
          </Button>
          <a href="tel:+4407514996775">
            <Button
              size="lg"
              className="w-40 bg-transparent lg:bg-white !border-[1px] border-white text-white lg:text-black hover:bg-white hover:text-neutral-950"
            >
              Call Us
            </Button>
          </a>
        </div>
      )}{" "}
      {/* Social Icons */}{" "}
      {(videoLoaded || showFallback) && (
        <div className="hidden lg:block">
          {" "}
          <div className="absolute lg:right-5 right-1/2 translate-x-1/2 lg:translate-x-0 lg:top-1/2 -translate-y-1/2 flex items-center justify-center lg:items-start lg:flex-col mt-12 lg:mt-0 gap-x-2 lg:space-y-2 z-20">
            {" "}
            <a target="_blank" href="mailto:sales@bragaexperience.com">
              <Image
                src="/mail.png"
                width={25}
                height={25}
                alt="mail icon"
                className="object-cover"
              />
            </a>
            <a target="_blank" href="https://www.youtube.com/@lucasbraga1230">
              <Image
                src="/youtube.png"
                width={25}
                height={25}
                alt="youtube"
                className="object-cover"
              />
            </a>
            <a target="_blank" href="https://www.instagram.com/bragaexp/">
              <Image
                src="/instagram.png"
                width={25}
                height={25}
                alt="instagram"
                className="object-cover"
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/braga-experience/"
            >
              <Image
                src="/linkedin.png"
                width={25}
                height={25}
                alt="linkedin"
                className="object-cover"
              />
            </a>
          </div>{" "}
        </div>
      )}
    </section>
  );
}
