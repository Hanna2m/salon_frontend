import React from "react";

function Button(props) {
  const { btnTxt } = props;

  return <button type="button">{btnTxt}</button>;
}

export default Button;
