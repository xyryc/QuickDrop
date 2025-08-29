import React, { useEffect, useRef, useState } from "react";
import { Plane, Headset, ShieldCheck, Clock } from "lucide-react";

// Palette based on #FF771A (Main Orange)
const COLORS = {
  main: "#FF771A",
  soft: "#FFB877",
  accent: "#FFE2C6",
  dark: "#24252A",
};

const features = [
  {
    icon: <Plane className="h-6 w-6 text-white" />,
    title: "Real-time Tracking",
    description:
      "Keep an eye on your parcels with live tracking. Know exactly where your package is, anytime.",
  },
  {
    icon: <Headset className="h-6 w-6 text-white" />,
    title: "24/7 Customer Support",
    description:
      "Our support team is available around the clock to help you with queries or issues.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-white" />,
    title: "Secure Packaging",
    description:
      "High-quality packaging ensures your items stay safe throughout the journey.",
  },
  {
    icon: <Clock className="h-6 w-6 text-white" />,
    title: "Flexible Delivery Options",
    description:
      "Choose same-day, next-day, or scheduled delivery to suit your needs.",
  },
];

const KeyFeatures = () => {
  const [visible, setVisible] = useState(features.map(() => false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const copy = [...prev];
              copy[i] = true;
              return copy;
            });
            observer.unobserve(el);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-[#FFE2C6]/40 via-white to-[#FFB877]/30 dark:from-[#24252A] dark:to-[#FF771A]/20 transition-colors">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-[#FF771A] mb-6">
          Key Features
        </h2>
        <p className="max-w-2xl mx-auto text-center text-[#24252A]/80 dark:text-white/80 text-lg mb-16">
          Discover the benefits that make our delivery service reliable and
          unique.
        </p>

        {/* Timeline */}
        <div className="relative border-l-4 border-[#FF771A]/30 dark:border-[#FFB877]/20">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => (refs.current[i] = el)}
              className={`relative mb-12 pl-10 transition-all duration-700 ${
                visible[i]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              {/* Icon Circle */}
              <span className="absolute left-[-1.6rem] top-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#FF771A] to-[#FFB877] shadow-lg">
                {feature.icon}
              </span>

              {/* Content */}
              <h3 className="text-2xl font-bold text-[#FF771A] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#24252A]/70 dark:text-white/70 text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
