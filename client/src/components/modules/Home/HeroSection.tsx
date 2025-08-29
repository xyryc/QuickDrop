import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom"; // Updated for react-router-dom

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={cn(
        "relative flex items-center justify-center min-h-[500px] md:min-h-[700px] lg:min-h-screen text-center overflow-hidden transition-all duration-700",
        "bg-cover bg-center bg-no-repeat"
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Gradient overlays for extra modern look */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-black/40 to-blue-600/40 z-10"></div>
      {/* Animated particles or shapes */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        {/* Decorative Blobs */}
        <div className="relative w-[400px] h-[400px] lg:w-[600px] lg:h-[600px]">
          <span className="absolute top-0 left-0 w-40 h-40 bg-blue-400/40 rounded-full blur-2xl animate-pulse"></span>
          <span className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400/40 rounded-full blur-2xl animate-pulse"></span>
          <span className="absolute bottom-0 left-1/2 w-16 h-16 bg-yellow-400/30 rounded-full blur-xl animate-pulse"></span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-3xl w-full px-6 py-10 md:py-24 flex flex-col items-center">
        <h1
          className={cn(
            "text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-blue-300 via-white to-blue-500 bg-clip-text text-transparent drop-shadow-lg transition-all duration-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-lg md:text-2xl lg:text-3xl font-light mb-8 text-white/80 transition-all duration-1000 delay-200",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {subtitle}
        </p>
        <Button
          asChild
          className={cn(
            "px-8 py-3 md:px-12 md:py-6 text-lg md:text-xl font-semibold rounded-full shadow-2xl bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 text-white transition-all duration-300 hover:scale-110 hover:shadow-3xl hover:bg-gradient-to-l hover:from-pink-500 hover:via-blue-500 hover:to-yellow-400 focus:ring-4 focus:ring-blue-200",
            "border-2 border-white/30 backdrop-blur-md",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Link to={buttonLink} className="block w-full h-full transition-all duration-300">
            {buttonText}
          </Link>
        </Button>
      </div>

      {/* Interactive hover effects */}
      <style>
        {`
          section:hover .bg-gradient-to-br {
            filter: brightness(0.9) blur(1px);
          }
          section:hover h1, section:hover p {
            text-shadow: 0 4px 24px rgba(0,0,0,0.3);
            letter-spacing: .02em;
            filter: drop-shadow(0 0 20px #3B82F6);
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;