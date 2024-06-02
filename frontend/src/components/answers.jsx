/* eslint-disable react/prop-types */
import { useRef } from "react";

const Answers = ({ onSelect, answer, selectedAnswer, answerState, COLORS }) => {
  const shuffleQuestions = useRef();

  if (!shuffleQuestions.current) {
    shuffleQuestions.current = [...answer];
    shuffleQuestions.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffleQuestions.current.map((answer, index) => {
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

        const colorsItems = COLORS.map((items) => items.colors_answers);
        const colorsItem = colorsItems[0][index];

        return (
          <li className="answer" key={answer}>
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              style={{ backgroundColor: colorsItem }}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
