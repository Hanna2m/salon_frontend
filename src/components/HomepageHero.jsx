import React from "react";
import "./_homepageHero.css";
import heroImg from "../assets/heroImg.jpg";

function HomepageHero() {
  return (
    <section className="hero-container">
      <div>
        <h2 className="hero-heading">Welcome</h2>
        <h3 className="hero-subheading">
          Local professional grooming service for your best friend. Our services
          are listed below.
        </h3>
      </div>
      <img className="hero-image" src={heroImg} width="200px" />
    </section>
  );
}

export default HomepageHero;
