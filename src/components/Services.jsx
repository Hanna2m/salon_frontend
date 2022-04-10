import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/_services.css";

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
    <section className="services-container">
      <h2 className="services-heading">Our services</h2>
      <div className="service-card-wrap">
        {allServices &&
          allServices.map((s) => (
            <div className="service-card">
              <div>
                <h3 className="service-card-title">{s.title}</h3>
                <p>{s.description}</p>
              </div>
              <div>
                <div className="service-card-deets">
                  <span className="duration"> Duration: {s.duration}mins </span>
                  <span className="cost">€{s.cost}</span>
                </div>

                <button
                  className="btn-book"
                  id={s.duration}
                  onClick={() => handleSelectService(s._id)}
                >
                  Book now
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Services;
