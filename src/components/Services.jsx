import React, { useState, useEffect } from "react";
import axios from "axios";

function Services() {
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");
  const [allServices, setAllServices] = useState("");

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    try {
      await axios.get("http://localhost:3080/service").then((res) => {
        setAllServices(res.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const addNewService = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3080/service/create-service", {
          title: serviceTitle,
          description: serviceDescription,
          cost: serviceCost,
          duration: serviceDuration,
        })
        .then((res) => console.log("POST", serviceTitle));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2>Services component</h2>
      <h3>Add New Service</h3>
      <form onSubmit={addNewService}>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          // value={serviceTitle}
          onChange={(e) => setServiceTitle(e.target.value)}
        />
        <label>Description: </label>
        <input
          type="text"
          name="description"
          // value={serviceDescription}
          onChange={(e) => setServiceDescription(e.target.value)}
        />
        <label>Cost: </label>
        <input
          type="number"
          name="cost"
          // value={serviceCost}
          onChange={(e) => setServiceCost(e.target.value)}
        />
        <label>Duration: </label>
        <input
          type="number"
          name="duration"
          // value={serviceDuration}
          onChange={(e) => setServiceDuration(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>

      <section>
        <h3>Current Services List</h3>
        <ul>
          {allServices &&
            allServices.map((s) => (
              <div>
                <h4>Title: {s.title}</h4>
                <p>
                  {s.description} <span>€{s.cost} </span>
                  <span>Duration: {s.duration}mins </span>
                </p>
              </div>
            ))}
        </ul>
      </section>
    </div>
  );
}

export default Services;
