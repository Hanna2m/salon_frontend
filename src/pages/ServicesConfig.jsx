import React, { useState, useEffect } from "react";
import "../components/styles/_configService.css"
import axios from "axios";
import Header from "../components/Header";
import { Button } from "@material-ui/core";
import ServiceItem from "./ServiceItem";
import TextField from '@mui/material/TextField';
import icon from "../assets/icon_service.svg"

function ServicesConfig() {
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");
  const [allServices, setAllServices] = useState("");
  // const [contentEditable, setContentEditable] = useState(false);

  const API_URL = "https://groomer-server.herokuapp.com/service/";

  useEffect(() => {
    getAllServices();
    // updateService();
  }, []);

  const getAllServices = async () => {
    try {
      await axios.get(API_URL).then((res) => {
        setAllServices(res.data);
        // console.log(allServices);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const addNewService = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(API_URL + "create-service", {
          title: serviceTitle,
          description: serviceDescription,
          cost: serviceCost,
          duration: serviceDuration,
        })
        .then((res) => res.redirect("/service"));
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(serviceCost);
  return (
    <div>
      <Header />
      
      <div className="content">
        <div className="content-block">
          
        </div>
        <div className="section-title">
          <img src={icon} alt="service-icon" />
          <h2>Services</h2>
        </div>
        <div className="add-service">
        <h5 id="section-title">Add New Service</h5>
        <form onSubmit={addNewService} >
          <div className="form-add-service">
            <div className="block">
              <div className="form-group">
                <label>Title: </label>
                <input
                  className="form-control"
                  label="Name"
                  type="text"
                  name="title"
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Cost: </label>
                <input
                  className="form-control"
                  type="number"
                  name="cost"
                  value={serviceCost}
                  onChange={(e) => setServiceCost(e.target.value)}
                  onBlur={(e) => setServiceCost(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Duration: </label>
                <input
                  className="form-control"
                  type="number"
                  name="duration"
                  value={serviceDuration}
                  onChange={(e) => setServiceDuration(e.target.value)}
                />
              </div>
          </div>
          <div className="block" >
            <div className="form-group">
              <label>Description: </label>
              <textarea
              className="form-control"
              rows="6"
              type="text"
              name="description"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />
            </div>
            <Button type="submit" variant="outlined">Save</Button>
          </div>
          </div>
          
        </form>
        </div>
        
        <section>
        <h5 id="section-title">Current Services</h5>
          <div className="current">
            <ul>
              {allServices &&
                allServices.map((s) => (
                  <ServiceItem
                    {...s}
                    allSeriveds={allServices}
                    setAllServices={setAllServices}
                    serviceTitle={serviceTitle}
                    setServiceTitle={setServiceTitle}
                    serviceDescription={serviceDescription}
                    setServiceDescription={setServiceDescription}
                    serviceCost={serviceCost}
                    setServiceCost={setServiceCost}
                    serviceDuration={serviceDuration}
                    setServiceDuration={setServiceDuration}
                  />
                ))}
            </ul>
          </div>
          
         
        </section>
      </div>
    </div>
  );
}

export default ServicesConfig;
