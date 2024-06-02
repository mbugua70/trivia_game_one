/* eslint-disable react-refresh/only-export-components */
import { useState, useCallback, useRef, Suspense } from "react";
import Question from "./question";
import Summary from "./Summary";
import { defer, Await, useLoaderData } from "react-router-dom";
import { fetchData } from "./api";

// data (question)

export const quizLoader = async () => {
  return defer({ allData: fetchData() });
};

const Quiz = () => {
  // useState for styling answered question

  // const [answerState, setAnswerState] = useState("");
  const [activeQuestion, setActiveQuestion] = useState([]);

  const activeQuestionIndex = activeQuestion.length;
  //   const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      console.log("Handle fun called");
      // setAnswerState("answered");
      setActiveQuestion((prevAnswer) => {
        return [...prevAnswer, selectedAnswer];
      });

      // setTimeout(() => {
      //   if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
      //     setAnswerState("correct");
      //   } else {
      //     setAnswerState("wrong");
      //   }

      //     setTimeout(() => {
      //       setAnswerState("");
      //     }, 2000);
      //   }, 1000);
    },
    // [activeQuestionIndex]
    []
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  //   if (quizCompleted) {
  //     return <Summary userAnswers={activeQuestion} />;
  //   }

  const questionPromise = useLoaderData();
  console.log(questionPromise);

  return (
    <>
      <div id="quiz" className="">
        <Suspense fallback={<h2>Loading.....</h2>}>
          <Await resolve={questionPromise.allData}>
            {(QUESTIONSDATA) => {
              const COLORS = QUESTIONSDATA.colors.colorsData;
              const QUESTIONS = QUESTIONSDATA.questions.allQuestions;

              if (activeQuestionIndex === QUESTIONS.length) {
                return (
                  <Summary userAnswers={activeQuestion} QUESTIONS={QUESTIONS} />
                );
              }
              return (
                <Question
                  userAnswers={activeQuestion}
                  key={activeQuestionIndex}
                  index={activeQuestionIndex}
                  QUESTIONS={QUESTIONS}
                  COLORS={COLORS}
                  onSelect={handleSelectedAnswer}
                  onSkipAnswer={handleSkipAnswer}
                />
              );
            }}
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default Quiz;
