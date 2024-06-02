/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const QuestionTimer = ({
  timeout,
  onTimeOut,
  mode,
  userAnswers,
  QUESTIONS,
}) => {
  // const [remainingTime, setRemainingTime] = useState(timeout);

  const answeredCorrectly = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const answeredPercent = Math.round(
    (answeredCorrectly.length / userAnswers.length) * 100
  );
  console.log(answeredPercent);
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
      // setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      console.log("Working");
      clearInterval(interval);
    };
  }, [timeout]);

  //   let countDown = remainingTime / 1000;

  return (
    <>
      <div className="scoreboard">
        <div className="scores_main">
          <h2>Scores</h2>
          <p>{isNaN(answeredPercent) ? "0" : answeredPercent}%</p>
        </div>
        <div className="timer_main">
          <h2>Timer</h2>
          {/* <p>{remainingTime > 0 ? countDown | 0 : "0"}</p> */}
        </div>
      </div>
      {/* <progress
        value={remainingTime}
        id="question-time"
        max={timeout}
        className={mode}
      /> */}
    </>
  );
};

export default QuestionTimer;
