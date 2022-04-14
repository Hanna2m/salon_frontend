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
  const [user, setUser] = useState({});
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  let workingHours = [];

  const API_URL = 'https://groomer-server.herokuapp.com/';

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
      await axios.get(API_URL+`service/${id}`).then((res) => {
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

  const handleAddAppointment = async (selectedDate, selectedTime, user) =>{
    const isAvailableTime = false
    const isAvailableDay = true
    const reservedTime = {selectedTime, isAvailableTime};
    console.log('1', new Date(selectedDate).toISOString())
    const days = (await getAllDates()).data;
    for (let i = 0; i < days.length; i++) {
      days[i].date = new Date(days[i].date).setHours(0, 0, 0, 0);
    }
    let day = days.filter((item) => {
      return item.date === selectedDate;
    });

    console.log('2', day)
    const changedTime = day[0].time.push(reservedTime);
    console.log('3', day[0].time)
    const convertDay = new Date(selectedDate + 7200000).toISOString()
    console.log('4', convertDay);
   
    
    try {
      await axios.put(API_URL+"day/"+day[0]._id, { 
        date: convertDay,
        isAvailable: isAvailableDay,
        time: [{
          startTime: selectedTime,
          isAvailable: isAvailableTime
        }]
        })
      .then((res) => {
        console.log("POST", res.data);
        setShowModal(false);
      });
    } catch (error) {
    console.log(error);
  }
  }

  return (
    <div className="content">
      <h3>Make Appointment</h3>
      <section>
        <ServiceSummary selectedService={selectedService} />
        <div>
          <p>Appointment time: {selectedTime}</p>
        </div>
      </section>
      
      {/* Not for MVP */}
      {/* <section>
        <DogDetails />
      </section> */}

      <section>
        <div className="booking-time">
          <div className="calendar">
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
              (availableTimeSlots.map((item) => <Button  onClick={(e) => setSelectedTime(item.startTime)} key={item.startTime}>{item.startTime}</Button>))}
          </div>
        </div>
        

        <section>
          <div>
            {(user) &&
            <Button variant="contained" onClick={handleBookTime}>Book the appointment</Button>
            }
            {(!user) &&
            <p>Please <Link replace state={{ from: location }} className="navbar-link" to="/login">Log in</Link> 
              or <Link replace state={{ from: location }} className="navbar-link" to="/login">Sign up</Link> to proceed the booking</p>
            }
          </div>
          

        </section>
      </section>
      <Modal onClose={() => setShowModal(false)}
            show={showModal}
            onSubmit={() => handleAddAppointment(selectedDate, selectedTime, user)}>
        <section>
          <h3>Your appointment summary</h3>
          <ServiceSummary selectedService={selectedService} />
          {(selectedDate && selectedTime) && (
            <p>
            On {moment(selectedDate).format("DD MMM YYYY")} at {selectedTime}
          </p>
          )} 
          {(!selectedTime) && (
            <h3>
            Please select the time before
          </h3>
          )} 
          
        </section>
      </Modal>
    </div>
  );
}

export default NewBookingDate;
