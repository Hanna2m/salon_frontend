// import { Button } from "@material-ui/core";
import React, { useState } from "react";

import Button from "./Button";

function DogDetails() {
  const [size, setSize] = useState("");
  const [hair, setHair] = useState("");
  const [dogName, setDogName] = useState("");

  const handleConfirm = (e) => {
    e.preventDefault();

    console.log("... dog details ....");

    // direct to a booking overview page which includes login signup options
    // reset all state ??
  };

  return (
    <form onSubmit={handleConfirm}>
      <h4>Please provide details about your dog</h4>
      <label htmlFor="dogName">Dog's name</label>
      <input
        name="dogName"
        onChange={(e) => setDogName(e.target.value)}
      ></input>
      <label htmlFor="size">Dog's size</label>
      <input
        name="size"
        list="size"
        onChange={(e) => setSize(e.target.value)}
      ></input>
      <datalist id="size">
        <option value="small (up to 10 kg)" />
        <option value="medium (11-20 kg)" />
        <option value="large (more than 20 kg)" />
      </datalist>
      <p>Dog's hair</p>
      <label htmlFor="short">short</label>
      <input
        type="radio"
        name="hair"
        id="short"
        value="short"
        onChange={(e) => setHair(e.target.value)}
      />
      <label htmlFor="long">long</label>
      <input
        type="radio"
        name="hair"
        id="long"
        value="long"
        onChange={(e) => setHair(e.target.value)}
      />
      <Button btnTxt="confirm" btnType="submit" />
    </form>
  );
}

export default DogDetails;
