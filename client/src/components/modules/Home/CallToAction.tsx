import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // ✅ Fixed import

// Palette based on #FF771A (Main Orange)
const COLORS = {
  main: "#FF771A",
  soft: "#FFB877",
  accent: "#FFE2C6",
  dark: "#24252A",
};

interface CallToActionProps {
  headline: string;
  subtext?: string; // ✅ optional description
  buttonText: string;
  buttonLink: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  headline,
  subtext = "Start your journey with us today and unlock endless possibilities!", // ✅ fallback text
  buttonText,
  buttonLink,
}) => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#FFE2C6] via-white to-[#FFB877]/40 dark:from-[#24252A] dark:to-[#FF771A]/10 transition-colors">
      <div className="container mx-auto px-4">
        <Card className="relative flex flex-col md:flex-row items-center md:justify-between px-8 py-16 md:p-20 bg-white/95 dark:bg-[#24252A]/90 rounded-3xl shadow-2xl border-0 overflow-hidden">
          {/* Decorative gradient rings */}
          <div className="hidden md:block absolute -top-20 -left-20 w-56 h-56 border-[12px] border-[#FF771A]/20 rounded-full animate-pulse"></div>
          <div className="hidden md:block absolute -bottom-24 -right-16 w-48 h-48 border-[10px] border-[#FFB877]/30 rounded-full animate-ping"></div>

          {/* Headline + subtext */}
          <CardHeader className="p-0 mb-10 md:mb-0 flex-1 z-10 text-center md:text-left">
            <CardTitle className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#FF771A]">
              {headline}
            </CardTitle>
            <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto md:mx-0">
              {subtext}
            </p>
          </CardHeader>

          {/* CTA Button */}
          <CardContent className="p-0 flex-1 flex items-center justify-center md:justify-end z-10">
            <Button
              asChild
              size="lg"
              className="px-10 py-5 md:px-14 md:py-6 text-lg md:text-xl font-bold rounded-full shadow-lg bg-gradient-to-r from-[#FF771A] via-[#FFB877] to-[#FFE2C6] text-white border-0 
                scale-105 shadow-[0_0_20px_#FF771A] transition-all duration-300"
            >
              <Link to={buttonLink}>{buttonText}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToAction;
