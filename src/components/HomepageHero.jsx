import React from "react";
import { useLottie } from "lottie-react";
import "./styles/_homepageHero.css";
import heroImg from "../assets/heroImg.jpg";
import dogApproval from "./lotties/dogAnimation.json"
import hero from "../assets/img_grooming.jpeg"

function HomepageHero() {
  const options = {
    animationData: dogApproval,
    loop: true,
    autoplay: true,
    rendererSettings: {

    }
  };

  const { View } = useLottie(options);
  return (
    <section>
      <div className="hero-container">
        <div className="hero-image-container">
          {/* { View } */}
          <img src={hero} alt="hero" />
        </div>
        <div className="hero-copy">
          <h2 className="hero-heading">Welcome</h2>
          <h3 className="hero-subheading">
            Your local professional grooming service for your best friend. Our
            services are listed below.
          </h3>
        </div>
      </div>
      
    </section>
  );
}

export default HomepageHero;
