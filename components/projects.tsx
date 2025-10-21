"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

type Tab = "filmmaking" | "photography";

const filmmakingProjects = [
  {
    id: 1,
    title: "London's Top Motorcycle Driving School",
    date: "August, 2025",
    description:
      "Promotional video produced for one of London's leading motorcycle training schools, showcasing their passion for safe riding and professional training.",
    videoUrl: "MzbJqS8-isc",
  },

  {
    id: 2,
    title: "Lifestyle Influencer",
    date: "July, 2025",
    description:
      "A series of engaging videos created for a lifestyle influencer, tailored for multiple social media platforms to enhance online presence and audience engagement.",
    videoUrl: "HtpVUz0-Q5Q",
  },
  {
    id: 3,
    title: "London High-End Catering Company",
    date: "June, 2025",
    description:
      "A promotional film highlighting a luxury catering company, focusing on premium presentation, craftsmanship, and behind-the-scenes artistry.",
    videoUrl: "0CmOGhD6XOk",
  },
  {
    id: 4,
    title: "Music Video",
    date: "August, 2025",
    description:
      "A cinematic music video produced for an underground artist, capturing the raw energy and authenticity of their sound.",
    videoUrl: "jkZrLvg3UXM",
  },
  {
    id: 5,
    title: "Showreel - Brazil",
    date: "September, 2025",
    description:
      "A dynamic showreel capturing cinematic moments and storytelling projects produced in Brazil.",
    videoUrl: "_kow2juGx_0",
  },
  {
    id: 6,
    title: "Showreel - London",
    date: "May, 2025",
    description:
      "A creative compilation of videography projects filmed across London, blending commercial, lifestyle, and cinematic visuals.",
    videoUrl: "0BX9p-cnDr0",
  },
];

const photographyProjects = [
  {
    id: 1,
    title: "Secret Dining Experience",
    date: "June, 2025",
    description:
      "An incredible opportunity to work with a Canadian company in partnership with Netflix, capturing the essence of an exclusive and immersive dining event.",
    images: [
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207834/p1i1_zqdxta.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207835/p1i2_ndid9m.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760208150/photography_ci1hyt.jpg",
    ],
  },
  {
    id: 2,
    title: "Organic Pet Food",
    date: "July, 2025",
    description:
      "A product-focused shoot designed to elevate the online presence of an organic pet food brand and highlight its commitment to natural ingredients and animal well-being.",
    images: [
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207834/p2i1_ocif1n.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207836/p2i2_vj5efh.jpg",
    ],
  },
  {
    id: 3,
    title: "Motorcycle Centre",
    date: "August, 2025",
    description:
      "Collaborated with one of London's largest motorcycle training schools to produce strong visual assets that showcase their professionalism and dynamic environment.",
    images: [
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207836/p3i1_hpiivr.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207837/p3i2_wt3yng.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207836/p3i3_vwne1h.jpg",
    ],
  },
  {
    id: 4,
    title: "Catering Company",
    date: "June, 2025",
    description:
      "Created a premium visual portfolio for a high-end London catering company, emphasizing their exceptional presentation and culinary artistry.",
    images: [
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207837/p4i1_jiuqya.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207839/p4i2_cjmyel.jpg",
    ],
  },
  {
    id: 5,
    title: "Beauty Clinic",
    date: "June, 2025",
    description:
      "Delivered a complete photography package for a luxury beauty clinic in Hampstead, focusing on elegance, detail, and brand identity.",
    images: [
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207839/p5i1_gh8vzu.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207834/p5i2_fpaltg.jpg",
    ],
  },
  {
    id: 6,
    title: "Engagement",
    date: "July, 2025",
    description:
      "Capturedatruly special moment as he proposed to his partner - a heartfelt story told through timeless and emotional imagery.",
    images: [
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207834/p6i1_pcoubd.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760207835/p6i2_q26k4h.jpg",
    ],
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("filmmaking");

  return (
    <section id="projects" className="lg:py-12 py-5 bg-[#1F1F1F]">
      <div className="container mx-auto px-2 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex lg:flex-row flex-col justify-between items-center"
        >
          <div className="lg:mb-12 mb-6 text-center lg:text-start">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4 title"
            >
              Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-neutral-400 text-lg"
            >
              Elevating your journey through film, and storytelling.
            </motion.p>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center lg:mb-12 mb-8"
          >
            <button
              onClick={() => setActiveTab("filmmaking")}
              className={`px-4 text-lg font-medium transition-all cursor-pointer title ${
                activeTab === "filmmaking"
                  ? "text-white relative after:absolute after:w-4/5 after:h-[1px] after:bg-white after:content-[''] after:bottom-0 after:left-1/2 after:-translate-x-1/2"
                  : "text-white/60"
              }`}
            >
              Filmmaking
            </button>
            <button
              onClick={() => setActiveTab("photography")}
              className={`px-4 text-lg font-medium transition-all cursor-pointer title ${
                activeTab === "photography"
                  ? "text-white relative after:absolute after:w-4/5 after:h-[1px] after:bg-white after:content-[''] after:bottom-0 after:left-1/2 after:-translate-x-1/2"
                  : "text-white/60"
              }`}
            >
              Photography
            </button>
          </motion.div>
        </motion.div>

        {activeTab === "filmmaking" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full items-stretch"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {filmmakingProjects.map((project, index) => {
                  return (
                    <CarouselItem
                      key={project.id}
                      className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full"
                      >
                        <Card className="bg-neutral-900 border-neutral-800 overflow-hidden pt-0 flex flex-col h-full">
                          <div className="relative aspect-video">
                            <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
                              <LiteYouTubeEmbed
                                key={project.id} // forces re-render
                                id={project.videoUrl}
                                title={project.title}
                                poster="maxresdefault"
                                params="rel=0&modestbranding=1&showinfo=0"
                              />
                            </div>
                          </div>
                          <CardContent className="p-6 py-0 flex flex-col flex-grow">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-lg font-bold text-white title">
                                {project.title}
                              </h3>
                              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>{project.date}</span>
                              </div>
                            </div>
                            <p className="text-neutral-400 text-base leading-relaxed">
                              {project.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious className="left-2 md:-mt-5 lg:mt-0 md:left-3 lg:-left-12 bg-neutral-800/90 hover:bg-neutral-700 border-neutral-700 text-white" />
              <CarouselNext className="right-2 md:-mt-5 lg:mt-0 md:right-3 lg:-right-12 bg-neutral-800/90 hover:bg-neutral-700 border-neutral-700 text-white" />
            </Carousel>
          </motion.div>
        )}

        {activeTab === "photography" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full items-stretch"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {photographyProjects.map((project, index) => (
                  <CarouselItem
                    key={project.id}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full"
                    >
                      <Card className="bg-neutral-900 border-neutral-800 overflow-hidden pt-0 flex flex-col h-full">
                        {/* Inner Carousel for Images */}
                        <div className="relative w-full">
                          <Carousel className="w-full">
                            <CarouselContent>
                              {project.images.map((image, imgIndex) => (
                                <CarouselItem key={imgIndex}>
                                  <div className="relative aspect-video">
                                    <Image
                                      src={image || "/placeholder.svg"}
                                      alt={`${project.title} - Image ${
                                        imgIndex + 1
                                      }`}
                                      fill
                                      priority
                                      className="object-cover"
                                    />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                          </Carousel>
                        </div>

                        {/* Card Content */}
                        <CardContent className="p-6 py-0 flex flex-col flex-grow">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-bold text-white title">
                              {project.title}
                            </h3>
                            <div className="flex items-center gap-2 text-neutral-400 text-sm">
                              <Calendar className="w-4 h-4" />
                              <span>{project.date}</span>
                            </div>
                          </div>

                          {/* Make description stick to bottom if shorter */}
                          <p className="text-neutral-400 text-base leading-relaxed">
                            {project.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="left-2 lg:-left-12 bg-neutral-800/90 hover:bg-neutral-700 border-neutral-700 text-white" />
              <CarouselNext className="right-2 lg:-right-12 bg-neutral-800/90 hover:bg-neutral-700 border-neutral-700 text-white" />
            </Carousel>
          </motion.div>
        )}
      </div>
    </section>
  );
}
