import React from "react";
import "./buttons.css";

const Button = ({ name, handler }: { name: string; handler: Function }) => {
  return (
    <>
      <button onClick={(e) => handler(e)} className="button">
        {name}
      </button>
    </>
  );
};
export default Button;
