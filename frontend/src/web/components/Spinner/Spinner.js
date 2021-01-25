import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <>
      <img
        src={spinner}
        style={{ width: "100px",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)" }}
        alt="Loading..."
      />
    </>
  );
};

export default Spinner;
