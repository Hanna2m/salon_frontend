import React, { useState } from "react";
import axios from "axios";

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
      <input
        type="text"
        name="title"
        defaultValue={title}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <label>Description: </label>
      <input
        type="text"
        name="description"
        defaultValue={description}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <label>Cost: </label>
      <input
        type="number"
        name="cost"
        defaultValue={cost}
        onChange={(e) => setNewCost(e.target.value)}
      />
      <label>Duration: </label>
      <input
        type="number"
        name="duration"
        defaultValue={duration}
        onChange={(e) => setNewDuration(e.target.value)}
      />
      <button onClick={() => updateService(_id)}>Save</button>
    </form>
  ) : (
    <div key={title}>
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
      <button
        onClick={() => {
          deleteService(_id);
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          setContentEditable(true);
          updateService(_id);
        }}
      >
        Edit
      </button>
    </div>
  );
};
export default ServiceItem;
