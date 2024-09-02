import React from "react";
import "../../styles/LoadingSpinner.css";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">

      <div className="custom-spinner" >
      </div>

      <div className=" text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>

    </div>
  );
}

export default LoadingSpinner;
