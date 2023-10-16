import React from "react";

function NotFound() {
  return (
    <div>
      <div className="NotFound bg-dark text-light p-4 rounded shadow">
        <h2>404 Error.</h2>
        <p className="lead">
          The requested URL was not found on this server 🙃
        </p>
      </div>
    </div>
  );
}

export default NotFound;
