import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

import DogDetails from "./DogDetails";
import ServiceSummary from "./ServiceSummary";

const getAllDates = async () => {
  try {
    const dates = await axios.get("https://groomer-server.herokuapp.com/day");
    return dates;
  } catch (error) {
    console.log(error.message);
  }
};

const getWorkTimes = async () => {
  try {
    const time = await axios.get("https://groomer-server.herokuapp.com/time");
    return time;
  } catch (error) {
    console.log(error.message);
  }
};

function NewBookingDate() {
  const { serviceId } = useParams();
  const params = useParams();
  const id = params.serviceId;
  let startDate = new Date();
  const [selectedService, setSelectedService] = useState({});
  let workingHours = [];
  const API_URL = `https://groomer-server.herokuapp.com/service/${id}`;

  useEffect(() => {
    getSelectedServiceData();
  }, []);

  const handleDateChange = (date) => {
    const pickerDate = new Date(date);
    startDate = pickerDate.setHours(0, 0, 0, 0);
    console.log("1", startDate);
    fetchDaySchedul(pickerDate);
  };

  const fetchDaySchedul = async (date) => {
    console.log("2", date);
    const scheduledDay = new Date(date).setHours(0, 0, 0, 0);
    console.log("2", scheduledDay);
    const days = (await getAllDates()).data;
    for (let i = 0; i < days.length; i++) {
      days[i].date = new Date(days[i].date).setHours(0, 0, 0, 0);
    }
    console.log("3", days);
    let day = days.filter((item) => {
      return item.date === scheduledDay;
    });
    const busyHours = day[0].time;
    console.log("4", busyHours);
    workingHours = (await getWorkTimes()).data;
    console.log(workingHours.length, busyHours.length);
    for (let i = 0; i < workingHours.length; i++) {
      for (let j = 0; j < busyHours.length; j++) {
        if (workingHours[i].startTime === busyHours[j].startTime) {
          workingHours.splice(i, 1);
        }
      }
    }
    console.log("5", workingHours);
  };

  const getSelectedServiceData = async () => {
    try {
      await axios.get(API_URL).then((res) => {
        let data = res.data;
        setSelectedService(data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <section>
        <ServiceSummary selectedService={selectedService} />
      </section>
      <section>
        <DogDetails />
      </section>

      <section>
        <h3>Make Appointment</h3>
        <div>
          <h4>Select Date:</h4>
          <DatePicker
            minDate={new Date()}
            // selected={startDate}
            onChange={handleDateChange}
            dateFormat="dddd, MMMM Do YYYY, h:mm:ss a"
            shouldCloseOnSelect={false}
            inline
          />
        </div>

        <section>
          {/* {!dayScheduleRef.current ? (
            <h2>Loading ..</h2>
          ) : (
            <div>
              {dayScheduleRef.current.length > 0 ? (
                // daySchedule.map((t, i) => <button key={i}>{t}</button>)
                dayScheduleRef.current.map(day => <h4 key={day.startTime}>{day.startTime}</h4>)
              ) : (
                <h4>No available appointments for selected date</h4>
              )}
            </div>
          )}*/}
        </section>
      </section>
    </div>
  );
}

export default NewBookingDate;
