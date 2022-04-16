import React, { useEffect, useState } from "react";
import "./styles/_newBooking.css";
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
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import petWash from "../assets/PetGrooming.png";

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

if (typeof window !== "undefined") {
  injectStyle();
}

function NewBookingDate() {
  const { serviceId } = useParams();
  const params = useParams();
  const location = useLocation();
  const id = params.serviceId;
  let startDate = new Date();
  const [selectedService, setSelectedService] = useState({});
  const [user, setUser] = useState({});
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  let workingHours = [];

  const API_URL = "https://groomer-server.herokuapp.com/";

  useEffect(() => {
    getSelectedServiceData();
    setUser(AuthService.getCurrentUser());
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
      await axios.get(API_URL + `service/${id}`).then((res) => {
        let data = res.data;
        setSelectedService(data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBookTime = (e) => {
    setShowModal(true);
  };

  const handleAddAppointment = async (selectedDate, selectedTime, user) => {
    const isAvailableTime = false;
    const isAvailableDay = true;
    const reservedTime = { selectedTime, isAvailableTime };
    const days = (await getAllDates()).data;
    for (let i = 0; i < days.length; i++) {
      days[i].date = new Date(days[i].date).setHours(0, 0, 0, 0);
    }
    let day = days.filter((item) => {
      return item.date === selectedDate;
    });
    const convertDay = new Date(selectedDate + 7200000).toISOString();
    console.log("2", convertDay);
    const newTime = {
      startTime: selectedTime,
      timeAvailable: false,
    };
    const times = day[0].time;
    times.push(newTime);
    console.log(times);
    // change time aviability in DAY collection
    try {
      await axios
        .put(API_URL + "day/" + day[0]._id, {
          date: convertDay,
          isAvailable: isAvailableDay,
          time: times,
        })
        .then((res) => {
          console.log("POST", res.data);
          setShowModal(false);
        });
    } catch (error) {
      console.log(error);
    }

    const appointmentDetails = {
      day: {
        date: convertDay,
      },
      time: {
        startTime: selectedTime,
      },
      customer: {
        name: user.name,
      },
      service: {
        title: selectedService.title,
        duration: selectedService.duration,
      },
    };

    //post data to Appointment collection
    try {
      await axios
        .post(API_URL + "appointment/", appointmentDetails)
        .then((res) => console.log("3", appointmentDetails, res));
    } catch (error) {
      console.log(error);
    }

    toast.success("Appointment successfully created");
    setTimeout(() => {
      window.location = "/";
    }, 5000);
  };

  return (
    <div className="content">
      <h3>Choose Date & Time</h3>
      <section>
        <div className="summary" style={{ backgroundColor: "FFF2F2" }}>
          <div id="summary-description">
            <ServiceSummary selectedService={selectedService} />
            {}
            {/* <p style={{ marginTop: "30px" }}>
              Appointment time: {selectedTime}
            </p> */}
          </div>
          <div id="summary-image">
            <img src={petWash} />
          </div>
        </div>
      </section>

      {/* Not for MVP */}
      {/* <section>
        <DogDetails />
      </section> */}

      <section>
        <div className="booking-time">
          <div className="calendar">
            <h5>Select Date:</h5>
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
            <h5>Select Time:</h5>
            {availableTimeSlots.length > 0 &&
              availableTimeSlots.map((item) => (
                <Button
                  onClick={(e) => setSelectedTime(item.startTime)}
                  key={item.startTime}
                >
                  {item.startTime}
                </Button>
              ))}
          </div>
        </div>

        <section>
          <div className="confirm">
            {user && (
              <Button
                variant="contained"
                onClick={handleBookTime}
                style={{
                  marginTop: "20px",
                  backgroundColor: "#864BF8",
                  color: "white",
                }}
              >
                Book appointment
              </Button>
            )}
            {!user && (
              <p>
                Please{" "}
                <Link
                  replace
                  state={{ from: location }}
                  className="navbar-link"
                  to="/login"
                >
                  Log in
                </Link>
                or{" "}
                <Link
                  replace
                  state={{ from: location }}
                  className="navbar-link"
                  to="/login"
                >
                  Sign up
                </Link>{" "}
                to proceed the booking
              </p>
            )}
          </div>
        </section>
      </section>
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        onSubmit={() => handleAddAppointment(selectedDate, selectedTime, user)}
      >
        <section>
          <h3>Your appointment summary</h3>
          <ServiceSummary selectedService={selectedService} />
          {selectedDate && selectedTime && (
            <p>
              On {moment(selectedDate).format("DD MMM YYYY")} at {selectedTime}
            </p>
          )}
          {!selectedTime && (
            <h4 style={{ color: "red" }}>Please select a time!</h4>
          )}
        </section>
      </Modal>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default NewBookingDate;
