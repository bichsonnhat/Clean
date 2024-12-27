import About from "@/components/about/about";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import React from "react";

const AboutPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="relative">
        <About />
        <div className="absolute top-0 left-0 w-full">
          <Header />
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
