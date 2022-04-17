import React from "react";
import Footer from "../components/Footer";

import Header from "../components/Header";
import HomepageHero from "../components/HomepageHero";
import Services from "../components/Services";

function Home() {
  return (
    <>
      <Header />
      <div className="content">
        <HomepageHero />
        <Services />
      </div>
      <Footer />
    </>
  );
}

export default Home;
