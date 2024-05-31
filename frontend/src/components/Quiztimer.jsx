/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeOut, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("TIMEOUT");
    // const timer = setTimeout(onTimeOut, timeout);
    console.log("Timeout 2");
    return () => {
      // clearTimeout(timer);
    };
  }, [timeout, onTimeOut]);

  // progress configuration
  useEffect(() => {
    console.log("INTERVAL");
    if (timeout <= 0) return;
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      console.log("Working");
      clearInterval(interval);
    };
  }, [timeout]);

  //   let countDown = remainingTime / 1000;

  return (
    <>
      <h2>Time</h2>
      {/* <p>{remainingTime > 0 ? countDown | 0 : "0"}</p> */}
      <progress
        value={remainingTime}
        id="question-time"
        max={timeout}
        className={mode}
      />
    </>
  );
};

export default QuestionTimer;
