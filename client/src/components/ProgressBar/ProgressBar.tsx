import React from "react";
import "./progressbar.css";

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="progressBox">
      <h1>Your Progress is: {progress}%</h1>
      <progress className="progress" value={progress} max="100">
        {progress}
      </progress>
    </div>
  );
};

export default ProgressBar;
