"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Smooth scroll to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Detect mobile devices
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fallbackTimer: NodeJS.Timeout;

    const handleCanPlay = () => {
      console.log("Video can play");
      setVideoLoaded(true);
      setShowFallback(false);
      clearTimeout(fallbackTimer);
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
      setVideoLoaded(false);
      setShowFallback(true);
      clearTimeout(fallbackTimer);
    };

    const handleLoadStart = () => {
      console.log("Video load started");
      // 2-second fallback timer
      fallbackTimer = setTimeout(() => {
        if (!videoLoaded) {
          console.log("2-second fallback timer triggered");
          setShowFallback(true);
        }
      }, 2000);
    };

    // If already loaded, show immediately
    if (video.readyState >= 3) {
      setVideoLoaded(true);
      setShowFallback(false);
    }

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      clearTimeout(fallbackTimer);
    };
  }, [videoLoaded]);

  // Choose video source based on device type
  const videoSrc = !isMobile
    ? "/videos/hero-test.mp4"
    : "https://res.cloudinary.com/digtoiyka/video/upload/f_auto:video,q_auto:good,w_800/hero-test_ajpimd.mp4";

  console.log("Mobile?", isMobile, videoSrc);

  return (
    <section
      id="hero"
      className="relative lg:h-screen h-[65vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Fallback image */}
        {showFallback && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760378693/Logo_Apresentacao_one8iz.png')`,
            }}
          />
        )}

        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover ${
            videoLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
          poster="https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_400/v1760378693/Logo_Apresentacao_one8iz.png"
        >
          <source src={videoSrc} type="video/mp4" />
          <img
            src="https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760378693/Logo_Apresentacao_one8iz.png"
            alt="Fallback background"
            loading="eager"
          />
        </video>

        {/* Overlay */}
        {(videoLoaded || showFallback) && (
          <div className="absolute inset-0 bg-black/40" />
        )}
      </div>

      {/* Hero Text & Buttons */}
      <div className="relative z-10 text-center">
        {videoLoaded ? (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="title text-lg md:text-2xl lg:text-6xl font-semibold leading-snug text-white/90 mb-8 max-w-7xl px-5 md:px-0 mx-auto text-pretty title">
              London-Based Videography & Photography for the UK & Europe
            </h1>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Button
                onClick={() => scrollToSection("projects")}
                variant="outline"
                size="lg"
                className="hidden lg:block bg-transparent border-white text-white hover:bg-white hover:text-neutral-950"
              >
                View Projects
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="hidden lg:block bg-transparent lg:bg-white !border-1 border-white text-white lg:text-black hover:bg-white hover:text-neutral-950"
              >
                Get a Quote
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <div className="w-full max-w-7xl px-5 md:px-0 mx-auto mt-44 lg:mt-[450px]">
            <h1 className="title text-lg md:text-2xl lg:text-6xl font-semibold leading-snug text-white/90 mb-8 text-pretty title">
              London-Based Videography & Photography for the UK & Europe
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("projects")}
                variant="outline"
                size="lg"
                className="hidden lg:block bg-transparent border-white text-white hover:bg-white hover:text-neutral-950"
              >
                View Projects
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                size="lg"
                className="hidden lg:block bg-transparent lg:bg-white !border-1 border-white text-white lg:text-black hover:bg-white hover:text-neutral-950"
              >
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Button */}
      {(videoLoaded || showFallback) && (
        <div className="absolute lg:hidden bottom-8 left-1/2 -translate-x-1/2 z-20">
          <Button
            onClick={() => scrollToSection("contact")}
            size="lg"
            className="bg-transparent lg:bg-white !border-1 border-white text-white lg:text-black hover:bg-white hover:text-neutral-950"
          >
            Get a Quote
          </Button>
        </div>
      )}

      {/* Social Icons */}
      {(videoLoaded || showFallback) && (
        <div className="hidden lg:block">
          <div className="absolute lg:right-5 right-1/2 translate-x-1/2 lg:translate-x-0 lg:top-1/2 -translate-y-1/2 flex items-center justify-center lg:items-start lg:flex-col mt-12 lg:mt-0 gap-x-2 lg:space-y-2 z-20">
            <a target="_blank" href="mailto:sales@bragaexperience.com">
              <Mail size={28} className="p-0.5 rounded-sm text-white/70" />
            </a>
            <a target="_blank" href="https://www.youtube.com/@lucasbraga1230">
              <Youtube size={32} className="p-0.5 rounded-sm text-white/70" />
            </a>
            <a target="_blank" href="https://www.instagram.com/bragaexp">
              <Instagram size={30} className="p-0.5 rounded-sm text-white/70" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/braga-experience/"
            >
              <Linkedin size={30} className="p-0.5 rounded-sm text-white/70" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
