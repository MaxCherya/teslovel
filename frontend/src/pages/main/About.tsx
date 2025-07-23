import React from "react";
import HeaderAboutUs from "../../components/forPages/AboutUs/HeaderAboutUs";
import { useOutletContext } from "react-router-dom";
import AboutUsComp from "../../components/forPages/AboutUs/AboutUsComp";
import OurBikes from "../../components/forPages/AboutUs/OurBikes";
import HowItWorks from "../../components/forPages/AboutUs/HowItWorks";
import OurServices from "../../components/forPages/AboutUs/OurServices";
import Pros from "../../components/forPages/AboutUs/Pros";
import WhyUs from "../../components/forPages/AboutUs/WhyUs";
import Terms from "../../components/forPages/AboutUs/Terms";

type ContextType = {
    showContacts?: boolean;
    setShowContacts?: React.Dispatch<React.SetStateAction<boolean>>;
};

const About: React.FC = () => {
    const { showContacts, setShowContacts } = useOutletContext<ContextType>();

    return (
        <div className="w-full min-h-screen bg-gray-100 text-gray-900">
            <HeaderAboutUs setShowContacts={setShowContacts} showContacts={showContacts} />
            <AboutUsComp />
            <OurBikes />
            <HowItWorks />
            <OurServices />
            <Pros />
            <WhyUs />
            <Terms />
        </div>
    )
}

export default About;