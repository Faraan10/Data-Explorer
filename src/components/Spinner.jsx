import React from "react";

const Spinner = () => {
  return (
    <div
      className="spinner"
      style={{
        display: "flex",
        justifyContent: "center",
        height: "90vh",
        alignItems: "center",
      }}
    >
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );
};

export default Spinner;
