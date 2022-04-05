import React, { useState } from "react";
import DatePicker from "react-datepicker";

// datepicker css file
import "react-datepicker/dist/react-datepicker.css";

function NewBookingDate() {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
  };
  console.log(startDate);
  return (
    <section>
      <h3>Make Appointment</h3>
      <div>
        <h4>Select Date:</h4>
        <DatePicker
          minDate={new Date()}
          selected={startDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          inline
        />
      </div>
    </section>
  );
}

export default NewBookingDate;
