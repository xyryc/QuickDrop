import ChatWidget from "@/components/ChatWidget";
import MissionStatement from "@/components/modules/About/MissionStatement";
import ServiceDescription from "@/components/modules/About/ServiceDescription";
import TeamInfo from "@/components/modules/About/TeamInfo";

const About = () => {
    return (
      <main>
      <ServiceDescription />
      <MissionStatement />
      <TeamInfo/>
      <ChatWidget />
    </main>
    );
};

export default About;