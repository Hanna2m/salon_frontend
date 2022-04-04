import React from "react";

import NewBookingDate from "../components/NewBookingDate";
import ServiceSummary from "../components/ServiceSummary";

function Booking() {
  return (
    <section>
      <section>
        <ServiceSummary />
      </section>
      <NewBookingDate />
    </section>
  );
}

export default Booking;
