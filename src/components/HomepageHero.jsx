import React from "react";
import "./styles/_homepageHero.css";
import heroImg from "../assets/heroImg.jpg";

function HomepageHero() {
  return (
    <section>
      <div className="hero-container">
        <div className="hero-copy">
          <h2 className="hero-heading">Welcome</h2>
          <h3 className="hero-subheading">
            Your local professional grooming service for your best friend. Our
            services are listed below.
          </h3>
        </div>
        <div>
          <div className="hero-image-container">
            <img className="hero-image" src={heroImg} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomepageHero;
