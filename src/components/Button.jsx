import React from "react";

const Button = (props) => {
  return (
    <div className={`input_grid ${props.class || ""}`}>
      <button onClick={() => props.handleClick(props.text)} type="button">
        {props.text}
      </button>
    </div>
  );
};

export default Button;
