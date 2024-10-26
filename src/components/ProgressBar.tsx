import React, { MutableRefObject } from "react";

type Props = {
  progressRef: MutableRefObject<HTMLDivElement | null>;
};

function ProgressBar({ progressRef }: Props) {
  return (
    <div className="progress">
      <div className="bar" ref={progressRef}>
        <div className="progress-value"></div>
      </div>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        Uploading...
      </div>
    </div>
  );
}

export default ProgressBar;
