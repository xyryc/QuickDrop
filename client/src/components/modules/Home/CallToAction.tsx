import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

// Palette based on #FF771A (Main Orange)
const COLORS = {
  main: "#FF771A",
  soft: "#FFB877",
  accent: "#FFE2C6",
  dark: "#24252A",
};

interface CallToActionProps {
  headline: string;
  buttonText: string;
  buttonLink: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ headline, buttonText, buttonLink }) => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#FFE2C6] via-white to-[#FFB877]/40 dark:from-[#24252A] dark:to-[#FF771A]/10 transition-colors">
      <div className="container mx-auto px-4">
        <Card className="relative flex flex-col md:flex-row items-center md:justify-between px-8 py-12 md:p-16 bg-white/95 dark:bg-[#24252A]/90 rounded-3xl shadow-2xl border-0 overflow-hidden">
          {/* Decorative blurred blob */}
          <div className="absolute -top-10 -left-20 w-44 h-44 bg-[#FF771A]/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#FFB877]/30 rounded-full blur-2xl pointer-events-none"></div>

          <CardHeader className="p-0 mb-8 md:mb-0 md:text-left flex-1 z-10">
            <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#FF771A] drop-shadow">
              {headline}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex items-center justify-end z-10">
            <Button
              asChild
              size="lg"
              className="px-8 py-4 md:px-12 md:py-6 text-lg md:text-xl font-semibold rounded-full shadow-lg bg-gradient-to-r from-[#FF771A] via-[#FFB877] to-[#FFE2C6] text-white border-0 hover:from-[#FFE2C6] hover:via-[#FF771A] hover:to-[#FFB877] transition-all duration-300"
            >
              <Link className="flex items-center space-x-2" to={buttonLink}>{buttonText}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      {/* Responsive adjustment for blob */}
      <style>
        {`
          @media (max-width: 900px) {
            .relative.flex > div {
              display: none !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default CallToAction;