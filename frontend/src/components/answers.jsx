/* eslint-disable react/prop-types */
import { useRef } from "react";
import wrongPic from "../../public/image/wrong.png";
import correctPic from "../../public/image/correct.png";

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
        let isCorrect;
        let isClicked = false;

        if (answerState === "answered" && isAnswered) {
          cssClass = "selected";
          isClicked = false;
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isAnswered
        ) {
          cssClass = answerState;
          isClicked = true;
        }

        if (answerState === "correct") {
          isCorrect = true;
        }

        if (answerState === "wrong") {
          isCorrect = false;
        }

        const colorsItems = COLORS.map((items) => items.colors_answers);
        const colorsItem = colorsItems[0][index];
        console.log(selectedAnswer);
        return (
          <li className="answer" key={answer}>
            <button
              onClick={() => onSelect(answer)}
              className={`${cssClass} animate__animated animate__zoomIn`}
              style={{ backgroundColor: colorsItem }}
              disabled={answerState !== ""}
            >
              {isAnswered &&
                isClicked &&
                (isCorrect ? (
                  <img
                    src={correctPic}
                    alt="correct"
                    className="correctPic show"
                  />
                ) : (
                  <img src={wrongPic} alt="wrong" className="wrongPic show" />
                ))}
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
