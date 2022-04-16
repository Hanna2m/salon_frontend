import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

const API_URL = "https://groomer-server.herokuapp.com/service/";

const ServiceItem = ({
  title,
  description,
  cost,
  duration,
  _id,
  serviceDuration,
  serviceTitle,
  setServiceTitle,
  serviceDescription,
  setServiceDescription,
  serviceCost,
  setServiceCost,
  setServiceDuration,
  allServices,
  setAllServices,
}) => {
  const [contentEditable, setContentEditable] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCost, setNewCost] = useState("");
  const [newDuration, setNewDuration] = useState("");

  const deleteService = (id) => {
    axios.delete(API_URL + id).then(() =>
      setAllServices(
        allServices.filter((val) => {
          return val._id !== id;
        })
      )
    );
  };

  const updateService = async (id) => {
    try {
      await axios
        .put(API_URL + id, {
          title: newTitle || title,
          description: newDescription || description,
          cost: newCost || cost,
          duration: newDuration || duration,
        })
        .then((res) => window.redirect("/service"));
    } catch (error) {
      console.log(error.message);
    }
  };

  return contentEditable ? (
    <form>
      <div className="form-add-service">
        <div className="block">
          <label>Title: </label>
          <input
            label="Name"
            type="text"
            name="title"
            defaultValue={title}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <label>Cost: </label>
          <input
            type="number"
            name="cost"
            defaultValue={cost}
            onChange={(e) => setNewCost(e.target.value)}
            //onBlur={(e) => setServiceCost(e.target.value)}
          />
          <label>Duration: </label>
          <input
            type="number"
            name="duration"
            defaultValue={duration}
            onChange={(e) => setNewDuration(e.target.value)}
          />
        </div>
        <div className="block">
          <label>Description: </label>
          <textarea
            rows="6"
            type="text"
            name="description"
            defaultValue={description}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
      </div>
      <Button
        type="submit"
        style={{ float: "right" }}
        onClick={() => updateService(_id)}
      >
        Save
      </Button>
    </form>
  ) : (
    <div key={title} className="service-info" id="config">
      <h4>Title: {title}</h4>
      <p>
        {description}{" "}
        <span
          onChange={(e) => {
            setServiceCost(e.target.value);
          }}
        >
          €{cost}{" "}
        </span>
        <span>Duration: {duration}mins </span>
      </p>
      <Button
        style={{ float: "right" }}
        onClick={() => {
          deleteService(_id);
        }}
      >
        Delete
      </Button>
      <Button
        style={{ float: "right" }}
        onClick={() => {
          setContentEditable(true);
          updateService(_id);
        }}
      >
        Edit
      </Button>
    </div>
  );
};
export default ServiceItem;
