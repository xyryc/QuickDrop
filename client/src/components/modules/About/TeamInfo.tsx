import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Palette
const COLORS = {
  main: "#FF771A",
  soft: "#FFB877",
  accent: "#FFE2C6",
  dark: "#24252A",
};

const teamMembers = [
  {
    name: "Bushra",
    role: "Chairman",
    avatar: "https://github.com/engrsakib/LogistiCore-a-percel-booking/blob/clientDev/client/public/fatema.jpg?raw=true",
    bio: "Bushra has over 15 years of experience in logistics and is passionate about solving delivery challenges.",
  },
  {
    name: "Md. Nazmus Sakib",
    role: "Chief Executive Officer",
    avatar: "https://github.com/engrsakib/LogistiCore-a-percel-booking/blob/clientDev/client/public/sakib.jpg?raw=true",
    bio: "Md. Nazmus Sakib manages our entire delivery network, ensuring every parcel is handled with care and efficiency.",
  },
  {
    name: "MN Shafin",
    role: "Chief Technology Officer",
    avatar: "https://github.com/engrsakib/LogistiCore-a-percel-booking/blob/clientDev/client/public/shafin.jpg?raw=true",
    bio: "Mahamodon Nabi Shafin is the mastermind behind our advanced tracking system and user-friendly web platform.",
  },
  {
    name: "UT MIM",
    role: "Chief Operating Officer",
    avatar: "https://github.com/engrsakib/LogistiCore-a-percel-booking/blob/clientDev/client/public/umaiya.jpg?raw=true",
    bio: "UT MIM is the mastermind behind our advanced tracking system and user-friendly web platform.",
  },
  {
    name: "Mohammad Anik",
    role: "Head Of Logistics",
    avatar: "https://github.com/engrsakib/LogistiCore-a-percel-booking/blob/clientDev/client/public/anik.jpg?raw=true",
    bio: "Mohammad Anik is the mastermind behind our advanced tracking system and user-friendly web platform.",
  },
  {
    name: "Sumiaya K Afra",
    role: "Head Of Marketing",
    avatar: "https://abayaandgown.com/wp-content/uploads/2023/08/Borkha-Unlimited-Hijab1.jpg",
    bio: "Sumiaya K Afra is the mastermind behind our advanced tracking system and user-friendly web platform.",
  },
  {
    name: "Arif Hossina khan",
    role: "Head of HR and Administration",
    avatar: "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
    bio: "Arif Hossina khan is the mastermind behind our advanced tracking system and user-friendly web platform.",
  },
  {
    name: "Rafya Islam arman",
    role: "Head of IT",
    avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
    bio: "Rafya Islam arman is the mastermind behind our advanced tracking system and user-friendly web platform.",
  },
];

const TeamCard: React.FC<{ member: typeof teamMembers[0] }> = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      <div className={`relative w-full h-80 transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* Front Side */}
        <Card className="absolute w-full h-full flex flex-col items-center justify-center p-8 text-center shadow-2xl border-0 bg-white/95 dark:bg-[#24252A]/90 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl overflow-visible [backface-visibility:hidden]">
          <Avatar className="h-24 w-24 mb-6 ring-4 ring-[#FF771A]/30 shadow-lg">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="text-3xl font-bold text-[#FF771A] bg-[#FFB877]/40">
              {member.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mb-1 text-2xl font-extrabold text-[#FF771A] drop-shadow">
            {member.name}
          </CardTitle>
          <p className="text-[#FFB877] font-semibold mb-2 uppercase tracking-wide">
            {member.role}
          </p>
        </Card>
        {/* Back Side */}
        <Card className="absolute w-full h-full flex flex-col items-center justify-center p-8 text-center shadow-2xl border-0 bg-[#FF771A]/90 dark:bg-[#24252A]/95 rounded-2xl transition-all duration-700 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardContent className="flex flex-col justify-center items-center h-full p-0">
            <p className="text-white dark:text-[#FFB877] text-lg font-medium animate-slideUp">
              {member.bio}
            </p>
          </CardContent>
        </Card>
      </div>
      <style>
        {`
        .perspective {
          perspective: 1200px;
        }
        @keyframes slideUp {
          0% { transform: translateY(40px); opacity: 0; }
          70% { opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(.48,.14,.44,1.01);
        }
        `}
      </style>
    </div>
  );
};

const TeamInfo = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#FFE2C6] via-white to-[#FFB877]/40 dark:from-[#24252A] dark:to-[#FF771A]/10 transition-colors">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight lg:text-5xl text-[#FF771A] drop-shadow">
          Meet Our Team
        </h2>
        <p className="max-w-2xl mx-auto text-[#24252A]/80 dark:text-white/80 mb-12 text-lg font-medium">
          Behind every successful delivery is a team of dedicated professionals.
        </p>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <TeamCard member={member} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamInfo;