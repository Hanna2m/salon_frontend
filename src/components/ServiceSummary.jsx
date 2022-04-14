import React from "react";

function ServiceSummary(props) {
  const { selectedService } = props;
  // console.log("props: ", selectedService);

  return (
    <section>
      <div className="service-info">
        <h4>Service summary</h4>
        {!selectedService ? (
          <h4>Loading ... </h4>
        ) : (
          <div>
            <p>
              Service: <span>{selectedService.title}</span>
            </p>
            <p>
              Duration: <span>{selectedService.duration} minutes</span>
            </p>
            <p>
              Cost: <span>€{selectedService.cost}</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ServiceSummary;
