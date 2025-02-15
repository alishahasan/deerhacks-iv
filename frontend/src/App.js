import React, { useState } from 'react';
import './styles.css';

const studentQuestions = [
  { 
    text: "When learning something new, I understand best when:", 
    options: [
      { text: "I see diagrams, charts, or videos.", style: "visual" },
      { text: "I hear explanations or discuss with others.", style: "auditory" },
      { text: "I try it myself with a hands-on approach.", style: "kinesthetic" },
      { text: "I read about it and take notes", style: "reading/writing" }
    ]
  },
  { 
    text: "When studying for an exam, I prefer to:", 
    options: [
      { text: "Watch recorded lectures or use decorated mind maps.", style: "visual" },
      { text: "Explain concepts out loud or join a study group.", style: "auditory" },
      { text: "Solve practice problems or use flashcards.", style: "kinesthetic" },
      { text: "Read the textbook and rewrite notes.", style: "reading/writing" }
    ]
  },
  { 
    text: "If I do not understand something in class, I usually:", 
    options: [
      { text: "Look at the slides or search for visual explanations online.", style: "visual" },
      { text: "Ask a friend or TA to listen to an explanation.", style: "auditory" },
      { text: "Try to apply the concept in a practical way.", style: "kinesthetic" },
      { text: "Read more about it in the textbook or online.", style: "reading/writing" }
    ]
  },
  { 
    text: "During office hours, I would find it most helpful if my TA:", 
    options: [
      { text: "Drew diagrams or showed visual examples.", style: "visual" },
      { text: "Explained things verbally and answered questions.", style: "auditory" },
      { text: "Walked me through hands-on exercises or interactive examples.", style: "kinesthetic" },
      { text: "Provided written step-by-step explanations or practice problems. ", style: "reading/writing" }
    ]
  },
  { 
    text: "I would prefer a Tutorial/Practical/Lab session to be:", 
    options: [
      { text: "A structured lesson where the TA explains everything first.", preference: "lecture-style" },
      { text: "A mix of explanations and open discussion where I can ask questions.", preference: "discussion" },
      { text: "A hands-on session where we work through problems step by step.", preference: "guided practice" },
      { text: "Time to work on problems with minimal interruptions, asking for help only when needed.", preference: "independent" }
    ]
  },
  { 
    text: "When I attend a Tutorial/Practical/Lab session, I:", 
    options: [
      { text: "Prefer to listen to a detailed explanation before doing any problems.", preference: "lecture-style" },
      { text: "Like discussing concepts with the TA and other students.", preference: "discussion" },
      { text: "Learn best by solving problems together with a TA guiding me.", preference: "guided practice" },
      { text: "Want time to work on my own first and ask for help as needed.", preference: "independent" }
    ]
  },
  { 
    text: "If I’m struggling with a topic, I would rather:", 
    options: [
      { text: "Have the TA explain it from the beginning in detail.", preference: "lecture-style" },
      { text: "Talk through it with the TA and other students.", preference: "discussion" },
      { text: "Work through example problems step by step with guidance.", preference: "guided practice" },
      { text: "Try solving it myself first, then ask for help if needed.", preference: "independent" }
    ]
  },
  // Add more student questions here...
];

const taQuestions = [
  {
    text: "When explaining a difficult concept, I prefer to:",
    options: [
      { text: "Use diagrams, animations, or visual aids.", style: "visual" },
      { text: "Give verbal explanations and encourage discussion.", style: "auditory" },
      { text: "Use real-world examples and interactive activities or demonstartions.", style: "kinesthetic" },
      { text: "Provide detailed written explanations and structured notes.", style: "reading" },
    ]
  },
  {
    text: "During office hours, I usually:",
    options: [
      { text: "Sketch things out or show visual demonstrations.", style: "visual" },
      { text: "Engage in back-and-forth discussions with students.", style: "auditory" },
      { text: "Work through problems interactively with students.", style: "kinesthetic" },
      { text: "Provide written step-by-step guides or direct students to reference materials.", style: "reading" },
    ]
  },
  {
    text: "When a student is struggling with a concept, I:",
    options: [
      { text: "Draw a diagram or show a video to explain it differently.", style: "visual" },
      { text: "Re-explain it in simpler terms and encourage questions.", style: "auditory" },
      { text: "Have them attempt a problem with my guidance.", style: "kinesthetic" },
      { text: "Give them written notes or resources to review.", style: "reading" },
    ]
  },
  {
    text: "My ideal teaching environment is one where:",
    options: [
      { text: "I can use slides, videos, or visuals to guide explanations.", style: "visual" },
      { text: "There is active discussion and verbal engagement.", style: "auditory" },
      { text: "Students can participate in problem-solving or interactive activities.", style: "kinesthetic" },
      { text: "Students can read, analyze, and work through structured material. ", style: "reading" },
    ]
  },
  {
    text: "In a typical Tutorial/Practical/Lab session, I prefer to:",
    options: [
      { text: "Give a structured explanation before students start working.", preference: "lecture-style" },
      { text: "Engage students in a discussion where they ask questions freely.", preference: "discussion" },
      { text: "Guide students through solving problems together.", preference: "guided practice" },
      { text: "Let students work independently and step in only when they ask for help. ", preference: "independent"},
    ]
  },
  {
    text: "When students struggle, I tend to:",
    options: [
      { text: "Give a clear, structured explanation before letting them try it.", preference: "lecture-style" },
      { text: "Ask them questions to help them figure it out themselves.", preference: "discussion" },
      { text: "Walk them through an example and have them do the next one with my guidance. ", preference: "guided practice" },
      { text: "Let them struggle a bit on their own and assist only when needed.", preference: "independent"},
    ]
  },
  {
    text: "My ideal Tutorial/Practical/Lab involves:",
    options: [
      { text: "Teaching concepts in depth before students work on problems.", preference: "lecture-style" },
      { text: "Encouraging students to ask questions and discuss ideas freely.", preference: "discussion" },
      { text: "Solving problems interactively with students.", preference: "guided practice" },
      { text: "Giving students space to work independently while being available for help.", preference: "independent"},
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
    setRole(selectedRole);
    setStep(1);  // Immediately show the quiz
  
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