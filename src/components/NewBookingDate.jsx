import React, { useEffect } from "react";
import useState from 'react-usestateref';
import DatePicker from "react-datepicker";
import parseISO from "date-fns/parseISO";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

import DogDetails from "./DogDetails";
import ServiceSummary from "./ServiceSummary";

function NewBookingDate() {
  const { serviceId } = useParams();
  const [startDate, setStartDate, startDateRef] = useState(new Date().setHours(0,0,0,0));
  const [availableDate, setAvailableDate, availableDateRef] = useState([]);
  const [filterDate, setFilterDate] = useState([]);
  const [selectedService, setSelectedService] = useState({});
  const [availableTimes, setAvailableTimes] = useState(); //*******/
  const [daySchedule, setDaySchedule, dayScheduleRef] = useState([]); 
  const [busySchedule, setBusySchedule, busyScheduleRef] = useState([]); 
  
  const params = useParams();
  const id = params.serviceId;

  const API_URL = `https://groomer-server.herokuapp.com/service/${id}`;

  useEffect(() => {
    getAllDates();
    getWorkTimes();
    //setStartDate(new Date().setHours(0,0,0,0));
    getSelectedServiceData();
  }, []);

  useEffect(() => {
    //console.log("dayschedule useEffect 1;",daySchedule)
    getAllDates();
    // console.log(dayScheduleRef.current)
    // return()=>{
    //   console.log(dayScheduleRef.current)
    // }
  }, [startDate]); //daySchedule

  useEffect(() => {
    //console.log("busySchedule useEffect 2;",busySchedule)
   
    
  }, [dayScheduleRef.current]); 

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

  const handleDateChange = (date) => {
    const pickerDate = new Date(date)
    setStartDate(pickerDate.setHours(0,0,0,0))
    dateFilter()  
    setAvailableDate([]);
    getWorkTimes()    
  };

  const dateFilter = () => {
    // console.log('dateFilter')
    // console.log('busy', busySchedule)
    for (let i = 0; i < busySchedule.length; i++) {
      for (let j = 0; j < daySchedule.length; j++) {
        if(busySchedule[i].startTime === daySchedule[j].startTime){
          setDaySchedule(daySchedule => (daySchedule.filter(item => item.startTime !== busySchedule[i].startTime)))
          console.log("day schedule", dayScheduleRef.current)

        }
      }
    }
  }
  
  const getAllDates = async () => {    
    try {
      await axios.get("https://groomer-server.herokuapp.com/day")
      .then((response) => {
        let data = response.data;
        for (let i = 0; i < data.length; i++) {          
          if (new Date(data[i].date).setHours(0,0,0,0) === startDate) {
            if (data[i].isAvailable === true) {
              setBusySchedule(data[i].time)
              console.log("busySchedule", busyScheduleRef.current)                 
              //console.log("dayschedule", daySchedule)

              // update daySchedule

              // setAvailableDate((availableDate) => [
              //   ...availableDate,                
              // ]);              
            } else {
                //display all times for this date                
                
            }
          }
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const getWorkTimes = async () => {
    setBusySchedule([])
    try {
      await axios.get("https://groomer-server.herokuapp.com/time")
      .then((response) => {
        setDaySchedule(response.data)
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
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="dddd, MMMM Do YYYY, h:mm:ss a"
            shouldCloseOnSelect={false}
            inline
          />
        </div>

        <section>
          {!dayScheduleRef.current ? (
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
          )}
        </section>
      </section>
    </div>
  );
}

export default NewBookingDate;
