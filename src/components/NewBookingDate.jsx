import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Outlet, useLocation } from "react-router-dom";
import DogDetails from "./DogDetails";
import ServiceSummary from "./ServiceSummary";
import AuthService from "../services/auth.service";
import { get } from "react-hook-form";
import { Button, Link } from "@material-ui/core";
import Modal from "./Modal";
import moment, { defineLocale } from "moment";

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
  const location = useLocation();
  const id = params.serviceId;
  let startDate = new Date();
  const [selectedService, setSelectedService] = useState({});
  const [bookingTime, setBokingTime] = useState();
  const [user, setUser] = useState({});
  const [showSignup, setShowSignup] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  let workingHours = [];

  const API_URL = `https://groomer-server.herokuapp.com/service/${id}`;

  useEffect(() => {
    getSelectedServiceData();
    setUser(AuthService.getCurrentUser())
    console.log("1", user)
  }, []);

  const handleDateChange = (date) => {
    const pickerDate = new Date(date);
    startDate = pickerDate.setHours(0, 0, 0, 0);
    fetchDaySchedul(pickerDate);
    setSelectedDate(startDate);
  };

  const fetchDaySchedul = async (date) => {
    const scheduledDay = new Date(date).setHours(0, 0, 0, 0);
    const days = (await getAllDates()).data;
    for (let i = 0; i < days.length; i++) {
      days[i].date = new Date(days[i].date).setHours(0, 0, 0, 0);
    }
    let day = days.filter((item) => {
      return item.date === scheduledDay;
    });
    const busyHours = day[0].time;
    workingHours = (await getWorkTimes()).data;
    for (let i = 0; i < workingHours.length; i++) {
      for (let j = 0; j < busyHours.length; j++) {
        if (workingHours[i].startTime === busyHours[j].startTime) {
          workingHours.splice(i, 1);
        }
      }
    }
    setAvailableTimeSlots(workingHours);
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
  

  const handleConfirm = async() => {
    try {
      await axios.post("https://groomer-server.herokuapp.com/")
      
    } catch (error) {
      
    }
  }

  const handleTimeSelect = (e) => {
    setShowModal(true);
    setSelectedTime(e.target.innerText);
    console.log(`${e.target.innerText} selected`);
  };

  return (
    <div>
      <section>
        <ServiceSummary selectedService={selectedService} />
        <div>
          <p>Appointment time: {bookingTime}</p>
        </div>
      </section>
      
      {/* Not for MVP */}
      {/* <section>
        <DogDetails />
      </section> */}

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
        <div className="time-slots">
            <h4>Select Time:</h4>
            {availableTimeSlots.length > 0 &&
            (availableTimeSlots.map((item) => <button onClick={handleTimeSelect} key={item.startTime}>{item.startTime}</button>))}
        </div>

        <section>
          <div>
            {(user) &&
            <Button onClick={()=>handleConfirm()}>Confirm</Button>
            }
            {(!user) &&
            <p>Please <Link replace state={{ from: location }} className="navbar-link" to="/login">Log in</Link> 
              or <Link replace state={{ from: location }} className="navbar-link" to="/login">Sign up</Link> to proceed the booking</p>
            }
          </div>
          

        </section>
      </section>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <section>
          <h3>Your appointment summary</h3>
          <ServiceSummary selectedService={selectedService} />
          <p>
            On {moment(selectedDate).format("DD MMM YYYY")} at {selectedTime}
          </p>
        </section>
      </Modal>
    </div>
  );
}

export default NewBookingDate;
