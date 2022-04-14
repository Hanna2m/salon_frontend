import React from "react";

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
      
    </>
  );
}

export default Home;
