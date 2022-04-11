import React from "react";

function Button(props) {
  const { btnTxt, btnType } = props;

  return <button type={btnType}>{btnTxt}</button>;
}

export default Button;
