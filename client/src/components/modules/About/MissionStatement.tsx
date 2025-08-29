import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

// Palette based on #FF771A (Main Orange)
const COLORS = {
  main: "#FF771A",
  soft: "#FFB877",
  accent: "#FFE2C6",
  dark: "#24252A",
};

const items = [
  {
    icon: <Target className="h-12 w-12 mb-4 text-[#FF771A]" />,
    title: "To Be the Best",
    desc: "We strive to be the leading parcel delivery service, setting new standards for efficiency and customer care.",
    blob: "#FFB87722",
  },
  {
    icon: <Lightbulb className="h-12 w-12 mb-4 text-[#FF771A]" />,
    title: "Innovation",
    desc: "By leveraging cutting-edge technology, we are constantly innovating to make your delivery experience smoother.",
    blob: "#FF771A22",
  },
  {
    icon: <TrendingUp className="h-12 w-12 mb-4 text-[#FF771A]" />,
    title: "Growth",
    desc: "We are committed to expanding our services and reaching more people, one delivery at a time.",
    blob: "#FFE2C622",
  },
];

const MissionStatement = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#FFE2C6] via-white to-[#FFB877]/40 dark:from-[#24252A] dark:to-[#FF771A]/10 transition-colors">
      <div className="container mx-auto px-4">
        <Card className="relative p-8 md:p-14 text-center md:text-left shadow-2xl border-0 bg-white/95 dark:bg-[#24252A]/90 rounded-3xl overflow-visible">
          {/* Decorative blurred blob */}
          <div className="absolute -top-10 -left-20 w-44 h-44 bg-[#FF771A]/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#FFB877]/30 rounded-full blur-2xl pointer-events-none"></div>
          <CardHeader className="p-0 mb-10">
            <CardTitle className="text-4xl font-extrabold tracking-tight md:text-5xl text-[#FF771A] drop-shadow">
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 grid md:grid-cols-3 gap-12">
            {items.map((item, i) => (
              <div
                className="relative flex flex-col items-center md:items-start text-center md:text-left px-4 py-6 bg-white/0 dark:bg-[#24252A]/0 rounded-xl group transition-all duration-300 hover:scale-105 hover:shadow-xl"
                key={i}
              >
                {/* Card blob effect */}
                <div
                  className="absolute -top-6 -right-8 w-16 h-16 rounded-full blur-xl pointer-events-none transition-all duration-500 group-hover:scale-125"
                  style={{ background: item.blob }}
                ></div>
                <span className="rounded-full p-5 border-2 border-[#FFB877] bg-[#FF771A]/10 shadow animate-cardPulse mb-4">
                  {item.icon}
                </span>
                <h3 className="text-2xl font-extrabold mb-2 text-[#FF771A] drop-shadow">{item.title}</h3>
                <p className="text-[#24252A]/80 dark:text-white/80 text-base font-medium min-h-[60px] flex items-center justify-center">
                  {item.desc}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      {/* Extra CSS for pulse animation */}
      <style>
        {`
        @keyframes cardPulse {
          0%,100% { box-shadow: 0 0 0 0 #FF771A22; }
          50% { box-shadow: 0 0 24px 6px #FF771A44; }
        }
        .animate-cardPulse {
          animation: cardPulse 2s infinite;
        }
        @media (max-width: 900px) {
          .relative > div {
            display: none !important;
          }
        }
        `}
      </style>
    </section>
  );
};

export default MissionStatement;