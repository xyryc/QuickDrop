import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, Smile } from 'lucide-react';

// Palette based on #FF771A (Main Orange)
const COLORS = {
  main: "#FF771A",
  soft: "#FFB877",
  accent: "#FFE2C6",
  dark: "#24252A",
};

const services = [
  {
    icon: <Package className="h-12 w-12 text-[#FF771A]" />,
    title: "Reliability",
    desc: "We ensure your parcels reach their destination on time, every time, with our advanced logistics network.",
    bg: "#FFB87722",
  },
  {
    icon: <Truck className="h-12 w-12 text-[#FF771A]" />,
    title: "Speed",
    desc: "Our optimized delivery routes and professional team guarantee the fastest delivery possible.",
    bg: "#FF771A22",
  },
  {
    icon: <Smile className="h-12 w-12 text-[#FF771A]" />,
    title: "Customer Satisfaction",
    desc: "Your happiness is our priority. We offer 24/7 support and hassle-free service to meet your needs.",
    bg: "#FFE2C622",
  },
];

const ServiceDescription = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#FFE2C6] via-white to-[#FFB877]/40 dark:from-[#24252A] dark:to-[#FF771A]/10 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-[#FF771A] drop-shadow">
            Our Mission
          </h2>
          <p className="max-w-2xl mx-auto text-[#24252A]/80 dark:text-white/80 mt-4 text-lg font-medium">
            We are dedicated to providing seamless, secure, and swift delivery solutions that connect people and businesses.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {services.map((service, i) => (
            <Card
              key={i}
              className="relative flex flex-col items-center text-center p-8 shadow-2xl border-0 bg-white/95 dark:bg-[#24252A]/90 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl group overflow-visible"
            >
              {/* Decorative blurred blob for card */}
              <div
                className="absolute -top-8 -right-8 w-20 h-20 rounded-full blur-xl pointer-events-none transition-all duration-500 group-hover:scale-125"
                style={{ background: service.bg }}
              ></div>
              <CardHeader className="p-0 mb-6 flex items-center justify-center">
                <div className="rounded-full bg-[#FF771A]/10 p-5 border-2 border-[#FFB877] shadow-lg animate-cardPulse">
                  {service.icon}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="mb-2 text-2xl font-extrabold text-[#FF771A] drop-shadow">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-[#24252A]/70 dark:text-white/70 text-base font-medium min-h-[60px] flex items-center justify-center">
                  {service.desc}
                </CardDescription>
              </CardContent>
              {/* Bottom accent bar with slide effect */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-2 rounded-full bg-gradient-to-r from-[#FF771A] via-[#FFB877] to-[#FFE2C6] opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:w-full"></div>
            </Card>
          ))}
        </div>
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
        `}
      </style>
    </section>
  );
};

export default ServiceDescription;