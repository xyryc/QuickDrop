import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Softer Palette
const COLORS = {
  main: "#FF6A1A", // warmer orange
  soft: "#FFC699", // peach
  accent: "#FFF1E6", // ivory/cream
  dark: "#1F2025", // deep charcoal
};

const teamMembers = [
  {
    name: "Rafya Islam arman",
    role: "Head of IT",
    avatar:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80",
    bio: "Rafya Islam Arman leads IT innovation to keep our systems secure and scalable.",
  },
  {
    name: "Bushra",
    role: "Chairman",
    avatar:
      "https://github.com/engrsakib/LogistiCore-a-percel-booking/blob/clientDev/client/public/fatema.jpg?raw=true",
    bio: "Bushra has over 15 years of experience in logistics and is passionate about solving delivery challenges.",
  },
  {
    name: "UT MIM",
    role: "Chief Operating Officer",
    avatar:
      "https://github.com/engrsakib/LogistiCore-a-percel-booking/blob/clientDev/client/public/umaiya.jpg?raw=true",
    bio: "UT MIM ensures smooth operations and optimizes every step of our logistics process.",
  },
  {
    name: "Mohammad Anik",
    role: "Head Of Logistics",
    avatar:
      "https://github.com/engrsakib/LogistiCore-a-percel-booking/blob/clientDev/client/public/anik.jpg?raw=true",
    bio: "Mohammad Anik oversees logistics operations, ensuring efficiency at every level.",
  },
  {
    name: "Sumiaya K Afra",
    role: "Head Of Marketing",
    avatar:
      "https://abayaandgown.com/wp-content/uploads/2023/08/Borkha-Unlimited-Hijab1.jpg",
    bio: "Sumiaya K Afra drives brand awareness and connects with customers through creative strategies.",
  },
  {
    name: "Arif Hossina khan",
    role: "Head of HR and Administration",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
    bio: "Arif Hossina Khan ensures our people and processes work seamlessly together.",
  },

  {
    name: "Md. Nazmus Sakib",
    role: "Chief Executive Officer",
    avatar:
      "https://github.com/engrsakib/LogistiCore-a-percel-booking/blob/clientDev/client/public/sakib.jpg?raw=true",
    bio: "Md. Nazmus Sakib manages our entire delivery network, ensuring every parcel is handled with care and efficiency.",
  },
  {
    name: "MN Shafin",
    role: "Chief Technology Officer",
    avatar:
      "https://github.com/engrsakib/LogistiCore-a-percel-booking/blob/clientDev/client/public/shafin.jpg?raw=true",
    bio: "Mahamodon Nabi Shafin is the mastermind behind our advanced tracking system and user-friendly web platform.",
  },
];

const TeamCard: React.FC<{ member: (typeof teamMembers)[0] }> = ({
  member,
}) => {
  const [showBio, setShowBio] = useState(false);

  return (
    <Card
      className="relative group overflow-hidden rounded-3xl shadow-lg border border-transparent bg-gradient-to-br from-white to-[#FFF6F0] dark:from-[#1F2025] dark:to-[#2C2D33] 
      transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:border-[#FF6A1A]/40"
    >
      <CardContent className="flex flex-col items-center p-8 text-center">
        <Avatar className="h-24 w-24 mb-6 ring-4 ring-[#FF6A1A]/30 shadow-md">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="text-2xl font-bold text-white bg-[#FF6A1A]">
            {member.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="mb-1 text-xl font-extrabold text-[#FF6A1A]">
          {member.name}
        </CardTitle>
        <p className="text-[#FF9F66] font-semibold mb-4 uppercase tracking-wide text-sm">
          {member.role}
        </p>

        {/* Reveal bio button */}
        <button
          onClick={() => setShowBio((prev) => !prev)}
          className="text-sm px-4 py-2 rounded-full bg-[#FF6A1A] text-white font-medium shadow-md hover:bg-[#E65C00] transition"
        >
          {showBio ? "Hide Bio" : "View Bio"}
        </button>

        {/* Bio text expand */}
        {showBio && (
          <p className="mt-4 text-[#24252A]/70 dark:text-white/80 text-sm leading-relaxed animate-fadeIn">
            {member.bio}
          </p>
        )}
      </CardContent>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-in-out;
          }
        `}
      </style>
    </Card>
  );
};

const TeamInfo = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#FFF1E6] via-white to-[#FFC699]/30 dark:from-[#1F2025] dark:to-[#2C2D33] transition-colors">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight lg:text-5xl text-[#FF6A1A] drop-shadow">
          Meet Our Team
        </h2>
        <p className="max-w-2xl mx-auto text-[#24252A]/80 dark:text-white/80 mb-12 text-lg font-medium">
          Behind every successful delivery is a team of dedicated professionals.
        </p>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <TeamCard member={member} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamInfo;
