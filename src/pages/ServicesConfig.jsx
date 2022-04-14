import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Button } from "@material-ui/core";
import ServiceItem from "./ServiceItem";

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
        <h2>Services component</h2>
        <h3>Add New Service</h3>
        <form onSubmit={addNewService}>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={serviceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
          />
          <label>Description: </label>
          <input
            type="text"
            name="description"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
          />
          <label>Cost: </label>
          <input
            type="number"
            name="cost"
            value={serviceCost}
            onChange={(e) => setServiceCost(e.target.value)}
            onBlur={(e) => setServiceCost(e.target.value)}
          />
          <label>Duration: </label>
          <input
            type="number"
            name="duration"
            value={serviceDuration}
            onChange={(e) => setServiceDuration(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>

        <section>
          <h3>Current Services List</h3>
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
        </section>
      </div>
    </div>
  );
}

export default ServicesConfig;
