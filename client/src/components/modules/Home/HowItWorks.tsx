import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Box, CheckCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from "react";

// Palette based on #FF771A (Main Orange)
const COLORS = {
  main: "#FF771A",
  soft: "#FFB877",
  accent: "#FFE2C6",
  dark: "#24252A",
};

const steps = [
  {
    icon: <Box className="h-12 w-12 text-[#FF771A]" />,
    title: "1. Place Your Order",
    description: "Easily book your parcel delivery through our simple and intuitive online form."
  },
  {
    icon: <Truck className="h-12 w-12 text-[#FF771A]" />,
    title: "2. We Pick It Up",
    description: "Our professional delivery team will collect the parcel from your location as scheduled."
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-[#FF771A]" />,
    title: "3. Delivered to Your Door",
    description: "We ensure safe and timely delivery of your parcel to the recipient's address."
  },
];

const HowItWorks = () => {
  // For animated slide-in
  const [visible, setVisible] = useState([false, false, false]);
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
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-[#FFE2C6] via-white to-[#FFB877]/60 dark:from-[#24252A] dark:to-[#FF771A]/15 transition-colors">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight lg:text-5xl text-[#FF771A] drop-shadow">
          How It Works
        </h2>
        <p className="max-w-2xl mx-auto text-[#24252A]/80 dark:text-white/80 mb-12 text-lg font-medium">
          Our process is simple and transparent. Follow these easy steps to get your parcel delivered safely.
        </p>
        <div className="relative flex flex-col md:flex-row justify-center items-stretch gap-8 min-h-[340px]">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className={
                `w-full md:w-[340px] lg:w-[360px] 
                transition-all duration-700
                ${visible[index] ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}
                ${index === 0 ? "md:-rotate-3 md:-translate-x-3" : ""}
                ${index === 2 ? "md:rotate-3 md:translate-x-3" : ""}
                `
              }
              style={{
                zIndex: 10 + index,
              }}
            >
              <Card
                className={
                  `flex flex-col items-center p-7 text-center shadow-2xl border-0
                   bg-white/95 dark:bg-[#24252A]/90
                   rounded-2xl
                   transition-all duration-300
                   hover:scale-105 hover:shadow-3xl`
                }
              >
                <CardHeader className="flex items-center justify-center p-0 mb-4">
                  <div className="rounded-full bg-[#FF771A]/10 p-5 border-2 border-[#FFB877] shadow-lg animate-cardPulse">
                    {step.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <CardTitle className="mb-2 text-2xl font-bold text-[#FF771A]">
                    {step.title}
                  </CardTitle>
                  <p className="text-[#24252A]/70 dark:text-white/70 font-medium">
                    {step.description}
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
          @media (max-width: 900px) {
            .relative.flex > div {
              transform: none !important;
              margin-left: 0 !important;
            }
          }
          @keyframes cardPulse {
            0%, 100% { box-shadow: 0 0 0 0 #FF771A22; }
            50% { box-shadow: 0 0 30px 10px #FF771A44; }
          }
          .animate-cardPulse {
            animation: cardPulse 2.5s infinite;
          }
        `}
      </style>
    </section>
  );
};

export default HowItWorks;