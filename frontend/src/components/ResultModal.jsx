/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
const TIMERS = 3000;
export default function ResultModal({ onCancel, errorMessage, onConfirm }) {
  const [timerId, setTimerId] = useState(null);
  const [remaining, setRemaining] = useState(TIMERS);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("INTERVAL");
      setRemaining((prevTimer) => prevTimer - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const newTimerId = setTimeout(() => {
      onConfirm();
    }, TIMERS);

    setTimerId(newTimerId);

    return () => {
      clearTimeout(newTimerId);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>OOPS!</h2>
      <p>{errorMessage}</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          Okay, got it
        </button>
        {/* <button
          onClick={() => clearTimeout(timerId)}
          className="button"
        >
          Yes
        </button> */}
      </div>
      <progress value={remaining} max={TIMERS} />
    </div>
  );
}
