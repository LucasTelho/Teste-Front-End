import React from "react";
import '../styles/index.css'; 

export default function CubeLoader() {
  return (
    <div className="cube-loader-wrapper">
      <div className="cube-loader">
        <div className="cube"></div>
      </div>
      <div className="cube-shadow"></div>
    </div>
  );
}
