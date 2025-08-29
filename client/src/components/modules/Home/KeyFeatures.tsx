import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Headset, ShieldCheck, Clock } from 'lucide-react';

// Palette based on #FF771A (Main Orange)
const COLORS = {
  main: "#FF771A",
  soft: "#FFB877",
  accent: "#FFE2C6",
  dark: "#24252A",
};

const features = [
  {
    icon: <Plane className="h-8 w-8 text-[#FF771A]" />,
    title: "Real-time Tracking",
    description: "Keep an eye on your parcels with our live tracking feature. Know exactly where your package is at all times."
  },
  {
    icon: <Headset className="h-8 w-8 text-[#FF771A]" />,
    title: "24/7 Customer Support",
    description: "Our dedicated support team is available around the clock to assist you with any queries or concerns."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-[#FF771A]" />,
    title: "Secure Packaging",
    description: "We use high-quality packaging materials to ensure your items are safe and secure throughout the journey."
  },
  {
    icon: <Clock className="h-8 w-8 text-[#FF771A]" />,
    title: "Flexible Delivery Options",
    description: "Choose from various delivery options that best fit your schedule, including same-day and next-day delivery."
  },
];

const KeyFeatures = () => {
  // For fade-in animation
  const [visible, setVisible] = useState([false, false, false, false]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const newArr = [...prev];
              newArr[i] = true;
              return newArr;
            });
            observer.unobserve(el);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-[#FFE2C6] via-white to-[#FFB877]/40 dark:from-[#24252A] dark:to-[#FF771A]/10 transition-colors">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight lg:text-5xl text-[#FF771A] drop-shadow">
          Key Features
        </h2>
        <p className="max-w-2xl mx-auto text-[#24252A]/80 dark:text-white/80 mb-12 text-lg font-medium">
          Discover the unique features that make our parcel delivery service stand out from the rest.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className={
                `transition-all duration-700
                 ${visible[index] ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"}`
              }
            >
              <Card
                className={
                  `flex flex-col items-center p-7 text-center shadow-2xl border-0
                   bg-white/95 dark:bg-[#24252A]/90
                   rounded-2xl
                   transition-all duration-300
                   hover:scale-105 hover:shadow-3xl hover:ring-4 hover:ring-[#FF771A]/30`
                }
              >
                <CardHeader className="flex items-center justify-center p-0 mb-4">
                  <div className="rounded-full bg-[#FF771A]/10 p-5 border-2 border-[#FFB877] shadow-lg animate-cardPulse">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <CardTitle className="mb-2 text-2xl font-bold text-[#FF771A]">
                    {feature.title}
                  </CardTitle>
                  <p className="text-[#24252A]/70 dark:text-white/70 font-medium">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {/* Extra CSS for card pulse animation */}
      <style>
        {`
          @keyframes cardPulse {
            0%, 100% { box-shadow: 0 0 0 0 #FF771A22; }
            50% { box-shadow: 0 0 24px 6px #FF771A44; }
          }
          .animate-cardPulse {
            animation: cardPulse 2s infinite;
          }
        `}
      </style>
    </section>
  );
};

export default KeyFeatures;