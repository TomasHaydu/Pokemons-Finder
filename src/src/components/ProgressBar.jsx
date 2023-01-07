import React from "react";

const ProgressBar = ({completed}) => {
  return (
    <div className="pregressbar__container" >
      <div
        className="pregressbar__container__filler"
        style={{ width: `${completed/1.54}%` }}
      >
        <span className="pregressbar__container__filler-label">
          {completed}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
