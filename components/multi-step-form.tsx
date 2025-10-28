"use client";

import { useState, useEffect } from "react";
import { X, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Step =
  | "service-type"
  | "videography-type"
  | "photography-type"
  | "final-product"
  | "budget"
  | "contact-method"
  | "contact-details"
  | "thank-you";

interface FormData {
  serviceType: string;
  videographyType: string;
  photographyType: string;
  finalProduct: string;
  budget: string;
  contactMethod: string;
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
}

export function MultiStepForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>("service-type");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    serviceType: "",
    videographyType: "",
    photographyType: "",
    finalProduct: "",
    budget: "",
    contactMethod: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getProgressPercentage = () => {
    const steps: Step[] = [
      "service-type",
      "videography-type",
      "photography-type",
      "final-product",
      "budget",
      "contact-method",
      "contact-details",
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / steps.length) * 100;
  };

  const handleNext = () => {
    if (currentStep === "service-type") {
      if (formData.serviceType === "Videography") {
        setCurrentStep("videography-type");
      } else if (formData.serviceType === "Photography") {
        setCurrentStep("photography-type");
      }
    } else if (currentStep === "videography-type") {
      setCurrentStep("final-product");
    } else if (currentStep === "photography-type") {
      setCurrentStep("budget");
    } else if (currentStep === "final-product") {
      setCurrentStep("budget");
    } else if (currentStep === "budget") {
      setCurrentStep("contact-method");
    } else if (currentStep === "contact-method") {
      setCurrentStep("contact-details");
    } else if (currentStep === "contact-details") {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep === "videography-type") {
      setCurrentStep("service-type");
    } else if (currentStep === "photography-type") {
      setCurrentStep("service-type");
    } else if (currentStep === "final-product") {
      setCurrentStep("videography-type");
    } else if (currentStep === "budget") {
      if (formData.serviceType === "Videography") {
        setCurrentStep("final-product");
      } else {
        setCurrentStep("photography-type");
      }
    } else if (currentStep === "contact-method") {
      setCurrentStep("budget");
    } else if (currentStep === "contact-details") {
      setCurrentStep("contact-method");
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setCurrentStep("thank-you");
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?\d{7,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  const isNextDisabled = () => {
    if (currentStep === "service-type") return !formData.serviceType;
    if (currentStep === "videography-type") return !formData.videographyType;
    if (currentStep === "photography-type") return !formData.photographyType;
    if (currentStep === "final-product") return !formData.finalProduct;
    if (currentStep === "budget") return !formData.budget;
    if (currentStep === "contact-method") return !formData.contactMethod;

    if (currentStep === "contact-details") {
      if (formData.contactMethod === "Phone Call") {
        return !validatePhone(formData.phoneNumber);
      }
      if (formData.contactMethod === "WhatsApp") {
        return !validatePhone(formData.whatsappNumber);
      }
      if (formData.contactMethod === "Mail") {
        return !validateEmail(formData.email);
      }
    }

    return false;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-xl overflow-hidden max-h-[80vh] flex flex-col"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between flex-shrink-0">
            <div className="flex-1 flex justify-center">
              <Image
                src="/formheader.png"
                alt="form header image"
                width={800}
                height={200}
                className="w-full h-auto object-cover max-h-24 sm:max-h-32 md:max-h-40"
              />
            </div>
            <button
              onClick={handleClose}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 w-8 h-8 sm:w-10 sm:h-10 bg-[#00000099] hover:bg-[#00000099]/80 rounded flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>

          {/* Progress Bar */}
          {currentStep !== "thank-you" && (
            <div className="h-1.5 sm:h-2 bg-gray-200 flex-shrink-0">
              <motion.div
                className="h-full bg-[#C4F82A]"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {currentStep === "service-type" && (
                <motion.div
                  key="service-type"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ServiceTypeStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </motion.div>
              )}
              {currentStep === "videography-type" && (
                <motion.div
                  key="videography-type"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <VideographyTypeStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </motion.div>
              )}
              {currentStep === "photography-type" && (
                <motion.div
                  key="photography-type"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <PhotographyTypeStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </motion.div>
              )}
              {currentStep === "final-product" && (
                <motion.div
                  key="final-product"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <FinalProductStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </motion.div>
              )}
              {currentStep === "budget" && (
                <motion.div
                  key="budget"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <BudgetStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </motion.div>
              )}
              {currentStep === "contact-method" && (
                <motion.div
                  key="contact-method"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContactMethodStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </motion.div>
              )}
              {currentStep === "contact-details" && (
                <motion.div
                  key="contact-details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContactDetailsStep
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </motion.div>
              )}
              {currentStep === "thank-you" && (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ThankYouStep />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {currentStep !== "thank-you" && (
            <div className="px-4 pb-4 sm:px-6 sm:pb-6 md:px-8 md:pb-8 flex justify-between items-center gap-2 sm:gap-4 flex-shrink-0 border-t border-gray-100 pt-4">
              {currentStep !== "service-type" ? (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base text-gray-600 hover:text-gray-800 font-medium transition-colors cursor-pointer"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={handleNext}
                disabled={isNextDisabled() || isSubmitting}
                className={cn(
                  "px-6 py-2.5 sm:px-8 sm:py-3 rounded font-medium transition-all cursor-pointer text-sm sm:text-base whitespace-nowrap",
                  isNextDisabled() || isSubmitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#C4F82A] text-black hover:bg-[#B5E625]"
                )}
              >
                {currentStep === "contact-details"
                  ? isSubmitting
                    ? "Submitting..."
                    : "Submit"
                  : "Next"}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ServiceTypeStep({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-center text-balance leading-tight">
        Which of the following describe your requirements?
      </h2>
      <div className="space-y-2 sm:space-y-3">
        <RadioOption
          label="Videography"
          checked={formData.serviceType === "Videography"}
          onChange={() => updateFormData("serviceType", "Videography")}
        />
        <RadioOption
          label="Photography"
          checked={formData.serviceType === "Photography"}
          onChange={() => updateFormData("serviceType", "Photography")}
        />
      </div>
    </div>
  );
}

function VideographyTypeStep({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
}) {
  const options = [
    "Event Coverage",
    "Commercial",
    "Full length movie",
    "Music Video",
    "Personal Requirement",
    "Short film",
    "School Project",
    "Christening",
    "Conference",
    "Funeral",
    "Graduation",
    "Office party",
    "Sports game",
    "Wedding",
    "Other",
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-center text-balance leading-tight">
        Which of the following describe your requirements?
      </h2>
      <div className="space-y-2 sm:space-y-3 max-h-[40vh] sm:max-h-[350px] overflow-y-auto pr-1 sm:pr-2">
        {options.map((option) => (
          <RadioOption
            key={option}
            label={option}
            checked={formData.videographyType === option}
            onChange={() => updateFormData("videographyType", option)}
          />
        ))}
      </div>
    </div>
  );
}

function PhotographyTypeStep({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
}) {
  const options = [
    "Event Coverage",
    "Birthday Party (Adult)",
    "Birthday Party (Child)",
    "Commercial",
    "Headshot",
    "Portraits & Family Photos",
    "Property",
    "Wedding",
    "Other",
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-center text-balance leading-tight">
        Which type of photography do you need?
      </h2>
      <div className="space-y-2 sm:space-y-3 max-h-[40vh] sm:max-h-[350px] overflow-y-auto pr-1 sm:pr-2">
        {options.map((option) => (
          <RadioOption
            key={option}
            label={option}
            checked={formData.photographyType === option}
            onChange={() => updateFormData("photographyType", option)}
          />
        ))}
      </div>
    </div>
  );
}

function FinalProductStep({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
}) {
  const options = [
    "Raw footage",
    "Full length movie",
    "Highlight video",
    "Other",
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-center text-balance leading-tight">
        What final product do you need?
      </h2>
      <div className="space-y-2 sm:space-y-3">
        {options.map((option) => (
          <RadioOption
            key={option}
            label={option}
            checked={formData.finalProduct === option}
            onChange={() => updateFormData("finalProduct", option)}
          />
        ))}
      </div>
    </div>
  );
}

function BudgetStep({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
}) {
  const options = [
    "Less than £250",
    "£250 - £499",
    "£500 - £999",
    "£1,000 - £1,999",
    "£2,000 - £2,999",
    "£3,000 - £4,999",
    "£5,000 or more",
    "Other",
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-center text-balance leading-tight">
        What is your estimated budget?
      </h2>
      <div className="space-y-2 sm:space-y-3">
        {options.map((option) => (
          <RadioOption
            key={option}
            label={option}
            checked={formData.budget === option}
            onChange={() => updateFormData("budget", option)}
          />
        ))}
      </div>
    </div>
  );
}

function ContactMethodStep({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
}) {
  const options = ["Phone Call", "WhatsApp", "Mail"];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-center text-balance leading-tight">
        How do you prefer to be contacted?
      </h2>
      <div className="space-y-2 sm:space-y-3">
        {options.map((option) => (
          <RadioOption
            key={option}
            label={option}
            checked={formData.contactMethod === option}
            onChange={() => updateFormData("contactMethod", option)}
          />
        ))}
      </div>
    </div>
  );
}

function ContactDetailsStep({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-center text-balance leading-tight">
        {formData.contactMethod === "Phone Call" && "Enter your phone number."}
        {formData.contactMethod === "WhatsApp" && "Enter your WhatsApp number."}
        {formData.contactMethod === "Mail" && "Enter your mail address."}
      </h2>
      <div className="space-y-2">
        <label className="block text-xs sm:text-sm font-medium text-gray-700">
          {formData.contactMethod === "Phone Call" && "Phone Number"}
          {formData.contactMethod === "WhatsApp" && "WhatsApp Number"}
          {formData.contactMethod === "Mail" && "Email"}
        </label>
        <div className="relative">
          {formData.contactMethod === "Mail" ? (
            <Mail className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          ) : formData.contactMethod === "Phone Call" ? (
            <Phone className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          ) : (
            <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400">
              <Image
                src="/whatsapp2.png"
                alt="WhatsApp"
                width={30}
                height={30}
                className="shadow-lg hover:scale-110 transition-transform duration-300 opacity-40"
              />
            </div>
          )}
          <input
            type={formData.contactMethod === "Mail" ? "email" : "tel"}
            required
            value={
              formData.contactMethod === "Phone Call"
                ? formData.phoneNumber
                : formData.contactMethod === "WhatsApp"
                ? formData.whatsappNumber
                : formData.email
            }
            onChange={(e) => {
              if (formData.contactMethod === "Phone Call") {
                updateFormData("phoneNumber", e.target.value);
              } else if (formData.contactMethod === "WhatsApp") {
                updateFormData("whatsappNumber", e.target.value);
              } else {
                updateFormData("email", e.target.value);
              }
            }}
            placeholder={
              formData.contactMethod === "Mail"
                ? "olivia@untitledui.com"
                : formData.contactMethod === "Phone Call"
                ? "+44 1234 567890"
                : "+44 1234 567890"
            }
            className="w-full text-sm sm:text-base placeholder:opacity-40 pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4F82A] focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

function ThankYouStep() {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 space-y-3 sm:space-y-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-center">Thank You!</h2>
      <p className="text-sm sm:text-base text-gray-600 text-center px-4">
        I'll get in touch within next 2 Hours.
      </p>
    </div>
  );
}

function RadioOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
      <div className="relative flex items-center justify-center flex-shrink-0">
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 sm:w-5 sm:h-5 appearance-none border-2 border-gray-300 rounded-full checked:border-[#6366F1] checked:border-[5px] sm:checked:border-[6px] transition-all cursor-pointer"
        />
      </div>
      <span className="text-sm sm:text-base text-gray-700 leading-snug">
        {label}
      </span>
    </label>
  );
}
