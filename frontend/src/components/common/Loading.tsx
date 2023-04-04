import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loading = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <PulseLoader color="#C63DEE" margin={2} />
      </div>
    </div>
  );
};

export default Loading;
