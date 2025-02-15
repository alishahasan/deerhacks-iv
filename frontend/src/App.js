import React, { useState } from 'react';
import './styles.css';

const questions = [
  { text: "Question 1", options: ["A", "B", "C", "D", "E"] },
  { text: "Question 2", options: ["A", "B", "C", "D", "E"] },
  { text: "Question 3", options: ["A", "B", "C", "D", "E"] },
  { text: "Question 4", options: ["A", "B", "C", "D", "E"] },
  { text: "Question 5", options: ["A", "B", "C", "D", "E"] }
];

function App() {
  const [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const startQuiz = () => {
    setStep(2);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="app-container">
      {step === 0 ? (
        <div className="landing">
          <h1>Are you ready to discover your learning style?</h1>
          <button onClick={startQuiz}>I'm Ready!</button>
        </div>
      ) : step === 2 ? (
        <div className="quiz">
          <h2>{questions[currentQuestion].text}</h2>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} className="option">
                {option}
              </button>
            ))}
          </div>
          <div className="navigation">
            {currentQuestion > 0 && (
              <button onClick={prevQuestion}>← Previous</button>
            )}
            {currentQuestion < questions.length - 1 && (
              <button onClick={nextQuestion}>Next →</button>
            )}
          </div>
        </div>
      ) : (
        <div className="landing">
          <h1>Let's Go!</h1>
        </div>
      )}
    </div>
  );
}

export default App;