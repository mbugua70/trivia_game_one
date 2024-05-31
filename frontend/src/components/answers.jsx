/* eslint-disable react/prop-types */
import { useRef } from "react";

const Answers = ({ onSelect, answer, selectedAnswer, answerState }) => {
  const shuffleQuestions = useRef();

  if (!shuffleQuestions.current) {
    shuffleQuestions.current = [...answer];
    shuffleQuestions.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffleQuestions.current.map((answer) => {
        const isAnswered = selectedAnswer === answer;
        let cssClass = "";
        if (answerState === "answered" && isAnswered) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isAnswered
        ) {
          cssClass = answerState;
        }
        return (
          <li className="answer" key={answer}>
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {shuffleQuestions.current.indexOf(answer) + 1}. {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
