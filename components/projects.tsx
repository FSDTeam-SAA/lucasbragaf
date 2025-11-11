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
    videoUrl: "sJuRuBKzHW0",
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
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207834/p1i1_zqdxta.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207835/p1i2_ndid9m.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760208150/photography_ci1hyt.jpg",
    ],
  },
  {
    id: 2,
    title: "Organic Pet Food",
    date: "July, 2025",
    description:
      "A product-focused shoot designed to elevate the online presence of an organic pet food brand and highlight its commitment to natural ingredients and animal well-being.",
    images: [
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207834/p2i1_ocif1n.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207836/p2i2_vj5efh.jpg",
    ],
  },
  {
    id: 3,
    title: "Motorcycle Centre",
    date: "August, 2025",
    description:
      "Collaborated with one of London's largest motorcycle training schools to produce strong visual assets that showcase their professionalism and dynamic environment.",
    images: [
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207836/p3i1_hpiivr.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207837/p3i2_wt3yng.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207836/p3i3_vwne1h.jpg",
    ],
  },
  {
    id: 4,
    title: "Catering Company",
    date: "June, 2025",
    description:
      "Created a premium visual portfolio for a high-end London catering company, emphasizing their exceptional presentation and culinary artistry.",
    images: [
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207837/p4i1_jiuqya.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207839/p4i2_cjmyel.jpg",
    ],
  },
  {
    id: 5,
    title: "Beauty Clinic",
    date: "June, 2025",
    description:
      "Delivered a complete photography package for a luxury beauty clinic in Hampstead, focusing on elegance, detail, and brand identity.",
    images: [
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207839/p5i1_gh8vzu.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207834/p5i2_fpaltg.jpg",
    ],
  },
  {
    id: 6,
    title: "Engagement",
    date: "July, 2025",
    description:
      "Captured a truly special moment as he proposed to his partner — a heartfelt story told through timeless and emotional imagery.",
    images: [
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207834/p6i1_pcoubd.jpg",
      "https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,w_800/v1760207835/p6i2_q26k4h.jpg",
    ],
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("filmmaking");
  const [showAll, setShowAll] = useState(false);

  const projects =
    activeTab === "filmmaking" ? filmmakingProjects : photographyProjects;

  // Responsive initial visibility
  const visibleProjects =
    typeof window !== "undefined" && window.innerWidth < 768
      ? showAll
        ? projects
        : projects.slice(0, 2)
      : showAll
      ? projects
      : projects.slice(0, 3);

  return (
    <section id="projects" className="lg:py-12 py-5 bg-[#1F1F1F]">
      <div className="container mx-auto px-2 lg:px-0">
        {/* Header + Tabs */}
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4 title"
            >
              Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center lg:mb-12 mb-8"
          >
            <button
              onClick={() => {
                setActiveTab("filmmaking");
                setShowAll(false);
              }}
              className={`px-4 text-lg font-medium transition-all cursor-pointer title ${
                activeTab === "filmmaking"
                  ? "text-white relative after:absolute after:w-4/5 after:h-[1px] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2"
                  : "text-white/60"
              }`}
            >
              Videography
            </button>
            <button
              onClick={() => {
                setActiveTab("photography");
                setShowAll(false);
              }}
              className={`px-4 text-lg font-medium transition-all cursor-pointer title ${
                activeTab === "photography"
                  ? "text-white relative after:absolute after:w-4/5 after:h-[1px] after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2"
                  : "text-white/60"
              }`}
            >
              Photography
            </button>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-neutral-900 border-neutral-800 overflow-hidden flex flex-col h-full py-0">
                {activeTab === "filmmaking" ? (
                  <div className="relative aspect-video">
                    <LiteYouTubeEmbed
                      key={project.id}
                      id={(project as any).videoUrl}
                      title={project.title}
                      poster="maxresdefault"
                      params="rel=0&modestbranding=1&showinfo=0"
                    />
                  </div>
                ) : (
                  <div className="relative w-full">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {(project as any).images.map(
                          (image: string, imgIndex: number) => (
                            <CarouselItem key={imgIndex}>
                              <div className="relative aspect-video">
                                <Image
                                  src={image}
                                  alt={`${project.title} - Image ${
                                    imgIndex + 1
                                  }`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </CarouselItem>
                          )
                        )}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  </div>
                )}

                <CardContent className="p-6 flex flex-col flex-grow">
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
          ))}
        </motion.div>

        {/* View More Button */}
        {projects.length > 3 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 bg-white/80 hover:bg-white/70 text-primary rounded-full transition-all cursor-pointer"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
