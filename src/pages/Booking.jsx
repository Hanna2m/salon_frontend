import React from "react";

import NewBookingDate from "../components/NewBookingDate";
import ServiceSummary from "../components/ServiceSummary";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Booking() {
  return (
    <section>
      <Header />
      <NewBookingDate />
      <Footer />
    </section>
  );
}

export default Booking;
