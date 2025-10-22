"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    serviceType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          serviceType: "",
          message: "",
        });
        setShowPopup(true);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="lg:py-12 py-5 bg-white/10 relative overflow-x-hidden"
    >
      <div className="container mx-auto px-2 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-b-xl lg:rounded-b-none lg:rounded-l-2xl overflow-hidden px-4 md:py-12 py-10 md:px-8 flex flex-col justify-center col-span-2 order-2 lg:order-1"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760208974/contact-left_a6qgrl.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10 text-white">
              <h2 className="text-xl md:text-3xl font-medium md:pr-6 mb-6 title text-[#C5F719]">
                Our London Videography Services Deliver Creative and Engaging
                Content Tailored to You and Your Business.
              </h2>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Serving London, the UK, and Europe, we deliver creative
                videography and photography services designed to capture your
                vision and make your brand stand out.
              </p>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Did You Know? <br /> 84% of video marketers say video has
                directly helped increase sales. <br /> 83% of consumers are
                convinced to buy a product or service after watching a brand’s
                video. <br /> Users spend 88% more time on websites that feature
                video content.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:sales@bragaexperience.com"
                  className="flex items-center gap-2"
                >
                  <Mail size={18} /> sales@bragaexperience.com
                </a>
                <a
                  href="tel:+4407514996775"
                  className="flex items-center gap-2"
                >
                  <Phone size={18} /> +44 07514-996775
                </a>
                <p className="flex items-center gap-2">
                  <MapPin size={18} /> London, UK & Europe
                </p>
                <p className="pt-3 text-lg font-semibold text-[#C5F719] title">
                  Social Links
                </p>
                <div className="inline-flex items-center space-x-3 group">
                  <a
                    target="_blank"
                    href="https://www.youtube.com/@lucasbraga1230"
                  >
                    <Image
                      src="/youtube.png"
                      width={30}
                      height={30}
                      alt="youtube"
                      className=""
                    />
                  </a>
                  <a target="_blank" href="https://www.instagram.com/bragaexp/">
                    <Image
                      src="/instagram.png"
                      width={25}
                      height={25}
                      alt="instagram"
                      className=""
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
                      className=""
                    />
                  </a>
                  <a target="_blank" href="tel:+44 07514-996775">
                    <Image
                      src="/phone-call.png"
                      width={25}
                      height={25}
                      alt="phone icon"
                      className=""
                    />
                  </a>
                  <a target="_blank" href="mailto:sales@bragaexperience.com">
                    <Image
                      src="/mail.png"
                      width={25}
                      height={25}
                      alt="mail icon"
                      className=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-t-xl lg:rounded-t-none lg:rounded-r-2xl overflow-hidden px-4 md:py-12 py-10 md:px-8 col-span-3 order-1 lg:order-2 bg-orange-600"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/digtoiyka/image/upload/f_auto,q_auto,dpr_auto,w_800/v1760208974/contact-right_x0hhhy.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-bold mb-6 title text-[#C5F719]">
                Get a Quote Within 2 Hours
              </h3>
              <p className="text-neutral-200 mb-8">
                Fast turnaround, tailored pricing for your project!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                  className="border-0 rounded-none p-0 border-[#F8F9FA]/40 border-b-[1px] text-white placeholder:text-[#F8F9FA] h-12"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="border-0 rounded-none p-0 border-[#F8F9FA]/40 border-b-[1px] text-white placeholder:text-[#F8F9FA] h-12"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  required
                  className="border-0 rounded-none p-0 border-[#F8F9FA]/40 border-b-[1px] text-white placeholder:text-[#F8F9FA] h-12"
                />
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, serviceType: value })
                  }
                  required
                >
                  <SelectTrigger className="border-[#F8F9FA]/40 !h-12 !text-white w-full border-0 rounded-none bg-transparent p-0 border-b-[1px] placeholder:text-[#F8F9FA]">
                    <SelectValue placeholder="Type of Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="videography">Videography</SelectItem>
                    <SelectItem value="drone">Drone</SelectItem>
                    <SelectItem value="event-coverage">
                      Event Coverage
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="border-0 rounded-none border-[#F8F9FA]/40 border-b-[1px] text-white placeholder:text-[#F8F9FA] pl-0"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-black lg:mt-12 mt-6 h-12 hover:bg-[#C5F719]/90 hover:text-black bg-[#C5F719]"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>

              <p className="text-sm text-white mt-4">
                <span className="text-red-500">* </span>Your personal details
                will be used in accordance with our
                <a
                  href="/Braga_Experience_Privacy_Notice.pdf"
                  download
                  className="text-white font-bold"
                >
                  {" "}
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ✅ Popup confirmation card */}
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex justify-center items-center px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
            >
              <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
                <h2 className="text-2xl font-bold mb-3 text-gray-800 title">
                  Thank you for getting in touch!
                </h2>
                <p className="text-gray-600 mb-4">
                  We&apos;ve received your message and will aim to respond within{" "}
                  <b>2 working hours</b>.
                </p>
                <p className="text-gray-600 mb-6">
                  If you&apos;d like to speak with us directly in the meantime,
                  please email{" "}
                  <a
                    href="mailto:sales@bragaexperience.com"
                    className="text-orange-600 font-semibold underline"
                  >
                    sales@bragaexperience.com
                  </a>{" "}
                  or{" "}
                  <a
                    href="tel:+4407514996775"
                    className="text-orange-600 font-semibold underline"
                  >
                    call us
                  </a>
                  .
                </p>
                <p className="text-gray-700 font-medium mb-4">
                  Want to learn more about Braga Experience while you wait? Feel
                  free to explore using the links below.
                </p>
                <div className="inline-flex items-center justify-center py-2 space-x-3 group">
                  <a
                    target="_blank"
                    href="https://www.youtube.com/@lucasbraga1230"
                  >
                    <Image
                      src="/youtube.png"
                      width={30}
                      height={30}
                      alt="youtube"
                      className=""
                    />
                  </a>
                  <a target="_blank" href="https://www.instagram.com/bragaexp/">
                    <Image
                      src="/instagram.png"
                      width={25}
                      height={25}
                      alt="instagram"
                      className=""
                    />
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/lucas-braga-50970a35a/"
                  >
                    <Image
                      src="/linkedin.png"
                      width={25}
                      height={25}
                      alt="linkedin"
                      className=""
                    />
                  </a>
                </div>
                <Button
                  onClick={() => setShowPopup(false)}
                  className="text-black w-full bg-[#C5F719] hover:bg-[#C5F719]/90"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
