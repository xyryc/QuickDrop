import HeroSection from '@/components/modules/Home/HeroSection';
import heroBackground from '../assets/images/parce-bannr.jpg';
import HowItWorks from '@/components/modules/Home/HowItWorks';
import KeyFeatures from '@/components/modules/Home/KeyFeatures';
import Testimonials from '@/components/modules/Home/Testimonials';
import CallToAction from '@/components/modules/Home/CallToAction';
import ChatWidget from '@/components/ChatWidget'; // Import the chat widget

const Home = () => {
    const buttonText = "Book Your Parcel Now";
    const buttonLink = "/register";

    return (
        <div>
            <HeroSection
                title="Your Fast and Reliable Parcel Delivery Partner"
                subtitle="Deliver with confidence. Experience seamless, secure, and swift parcel delivery services tailored for your needs."
                buttonText={buttonText}
                buttonLink={buttonLink}
                backgroundImage={heroBackground}
            />
            <HowItWorks />
            <KeyFeatures />
            <Testimonials />
            <CallToAction
                headline="Start your first delivery with us today!"
                buttonText={buttonText}
                buttonLink={buttonLink}
            />
            <ChatWidget /> {/* Right bottom chat icon & widget */}
        </div>
    );
};

export default Home;