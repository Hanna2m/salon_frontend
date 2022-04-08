import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Services() {
  const [allServices, setAllServices] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    try {
      await axios
        .get("https://groomer-server.herokuapp.com/service")
        .then((res) => {
          setAllServices(res.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSelectService = (id) => {
    let path = `/booking/${id}`;
    navigate(path);
  };

  return (
    <section>
      <h2>SERVICES LIST</h2>
      <div>
        {allServices &&
          allServices.map((s) => (
            <div
              key={s.title}
              style={{
                border: "1px solid darkgrey",
                padding: "1rem",
              }}
            >
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <div>
                <span>€{s.cost}</span>
                <span> Duration: {s.duration}mins </span>
              </div>
              <button
                id={s.duration}
                onClick={() => handleSelectService(s._id)}
              >
                Book now
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Services;