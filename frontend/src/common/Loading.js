import React from "react";
// import "./Loading.css";

function Loading() {
  return (
    <div className="Loading">
      <p>
        <span
          className="Loading-spinner spinner-grow spinner-grow-lg"
          role="status"
          aria-hidden="true"
        >
          {" "}
        </span>
        <span
          className="Loading-spinner spinner-grow spinner-grow-lg"
          role="status"
          aria-hidden="true"
        >
          {" "}
        </span>

        <span
          className="Loading-spinner spinner-grow spinner-grow-lg"
          role="status"
          aria-hidden="true"
        >
          {" "}
        </span>
      </p>
    </div>
  );
}

export default Loading;
