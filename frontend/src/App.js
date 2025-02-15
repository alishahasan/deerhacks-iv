import React, { useState } from 'react';
import './styles.css';

const studentQuestions = [
  { 
    text: "I learn best when...", 
    options: [
      { text: "I can see visual aids and diagrams", preference: "visual" },
      { text: "I can listen to detailed explanations", preference: "auditory" },
      { text: "I can try things hands-on", preference: "kinesthetic" },
      { text: "I can read and take notes", preference: "reading" },
      { text: "I can discuss with others", preference: "collaborative" }
    ]
  },
  // Add more student questions here...
];

const taQuestions = [
  {
    text: "When explaining concepts, I prefer to...",
    options: [
      { text: "Draw diagrams and use visual aids", style: "visual" },
      { text: "Give detailed verbal explanations", style: "auditory" },
      { text: "Show practical demonstrations", style: "kinesthetic" },
      { text: "Provide written explanations", style: "reading" },
      { text: "Lead interactive discussions", style: "collaborative" }
    ]
  },
  // Add more TA questions here...
];

function App() {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [matches, setMatches] = useState([]);

  const questions = role === 'student' ? studentQuestions : taQuestions;

  const startQuiz = async (selectedRole) => {
    try {
      const response = await fetch('http://localhost:5001/start-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: selectedRole }),
      });
      const data = await response.json();
      setUserId(data.userId);
      setRole(selectedRole);
      setStep(1);
    } catch (error) {
      console.error('Error starting quiz:', error);
    }
  };

  const handleAnswer = async (optionIndex) => {
    const newAnswers = [...answers, {
      questionNumber: currentQuestion + 1,
      answerIndex: optionIndex,
      ...(role === 'student' 
        ? { learningPreference: questions[currentQuestion].options[optionIndex].preference }
        : { teachingStyle: questions[currentQuestion].options[optionIndex].style }
      )
    }];
    
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit all responses
      try {
        const response = await fetch('http://localhost:5001/submit-responses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            role,
            responses: newAnswers,
          }),
        });
        const data = await response.json();
        if (data.matches) {
          setMatches(data.matches);
        }
        setStep(3); // Move to results page
      } catch (error) {
        console.error('Error submitting responses:', error);
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  if (step === 0) {
    return (
      <div className="app-container">
        <div className="landing">
          <h1>Ready to discover your style?</h1>
          <h2>Are you a...</h2>
          <div className="role-buttons">
            <button onClick={() => startQuiz('student')}>Student</button>
            <button onClick={() => startQuiz('ta')}>Teaching Assistant</button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="app-container">
        <div className="quiz">
          <h2>Question {currentQuestion + 1} of {questions.length}</h2>
          <h3>{questions[currentQuestion].text}</h3>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button 
                key={index} 
                className="option"
                onClick={() => handleAnswer(index)}
              >
                {option.text}
              </button>
            ))}
          </div>
          {currentQuestion > 0 && (
            <button onClick={prevQuestion} className="nav-button">
              ← Previous
            </button>
          )}
          <div className="progress-bar">
            <div 
              className="progress"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Results page
  return (
    <div className="app-container">
      <div className="landing">
        <h1>Quiz Complete!</h1>
        {role === 'student' && matches.length > 0 ? (
          <div>
            <h2>Your Top TA Matches:</h2>
            <div className="matches">
              {matches.map((match, index) => (
                <div key={index} className="match-card">
                  <h3>TA #{match.ta_id}</h3>
                  <p>Matching Styles: {match.matching_styles}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Your responses have been recorded.</p>
        )}
        <button onClick={() => {
          setRole(null);
          setStep(0);
          setCurrentQuestion(0);
          setAnswers([]);
          setMatches([]);
        }}>Start Over</button>
      </div>
    </div>
  );
}

export default App;