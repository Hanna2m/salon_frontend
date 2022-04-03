import React, { useEffect, useState } from "react";
import axios from "axios";

function Services() {
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

  return (
    <section>
      <h2>SERVICES LIST</h2>
      <div
      // style={{
      //   display: "flex",
      //   border: "1px solid red",
      // }}
      >
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
            </div>
          ))}
      </div>
    </section>
  );
}

export default Services;
