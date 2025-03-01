import React, { useState } from 'react';
import './styles.css';
import Logo from './Logo';



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

const styleDescriptions = {
    'Visual': "You learn best through visual aids like diagrams, charts, and images. Visual learners excel at understanding information when it's presented in a graphical format.",
    'Auditory': 'You learn effectively by listening and discussing. Auditory learners benefit from lectures, group discussions, and verbal explanations.',
    'Kinesthetic': 'You learn through hands-on experience and physical activity. Kinesthetic learners thrive when they can touch, move, and interact with learning materials.',
    'Reading/Writing': 'You prefer learning through written words. Reading/writing learners excel at taking notes, reading textbooks, and writing summaries of information.'
  };
  
  const preferenceDescriptions = {
    'Lecture-style': 'You appreciate structured presentations where an instructor explains concepts thoroughly. This traditional approach helps you grasp complex ideas systematically.',
    'Discussion': 'You thrive in interactive environments where ideas are exchanged freely. Group discussions help you understand different perspectives and deepen your understanding.',
    'Guided Practice': 'You learn best when theory is combined with practical application under instructor supervision. This balanced approach helps you build confidence while mastering new skills.',
    'Independent': 'You excel at self-directed learning and prefer to work at your own pace. This approach allows you to deeply explore topics that interest you.'
  };
  

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

const courses = [
  { code: "CSC263", name: "Data Structures and Analysis", lecture: "MW 10-11", tutorial: "F 2-3" },
  { code: "CSC258", name: "Computer Organization", lecture: "TR 11-12", lab: "W 3-5" },
  { code: "CSC209", name: "Software Tools and Systems Programming", lecture: "MW 1-2", tutorial: "R 4-5" },
  { code: "CSC309", name: "Programming on the Web", lecture: "TR 2-3", tutorial: "F 11-12" }
];

const taMatches = [
    { name: "John Smith", style: "Visual", stylePercentage: 33, preference: "Lecture-style", preferencePercentage: 50, email: "john.smith@example.com" },
    { name: "Jane Doe", style: "Auditory", stylePercentage: 100, preference: "Discussion", preferencePercentage: 100, email: "jane.doe@example.com" },
    { name: "Alice Johnson", style: "Kinesthetic", stylePercentage: 50, preference: "Guided Practice", preferencePercentage: 33, email: "alice.johnson@example.com" },
    { name: "Bob Brown", style: "Reading/Writing", stylePercentage: 66, preference: "Independent", preferencePercentage: 33, email: "bob.brown@example.com" },
    { name: "Charlie Davis", style: "Visual", stylePercentage: 33, preference: "Discussion", preferencePercentage: 66, email: "charlie.davis@example.com" }
  ];

//   const matchedTAs = taMatches.filter(ta =>
//   topStyle && ta.style === topStyle.name
// );



function App() {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [stylePercentages, setStylePercentages] = useState([]);
  const [preferencePercentages, setPreferencePercentages] = useState([]);
  const [quizTaken, setQuizTaken] = useState(false);

  console.log("TA Matches:", taMatches);

  const questions = role === 'student' ? studentQuestions : taQuestions;
  const subject = role === "student" ? "Learning" : "Teaching";

  const [registeredClasses, setRegisteredClasses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(""); // Store selected course code

  const addClass = () => {
    const courseToAdd = courses.find(course => course.code === selectedCourse);
    if (courseToAdd && !registeredClasses.some(course => course.code === selectedCourse)) {
      setRegisteredClasses([...registeredClasses, courseToAdd]);
    } else {
      alert("Course already added or invalid selection!");
    }
  };

  const startQuiz = async (selectedRole) => {
    setRole(selectedRole);
    setStep(3);
  }
  

  // State for login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Function to handle login
    // Function to handle login
    const handleLogin = async () => {
        // Basic validation
        if (email === '' || password === '') {
          setLoginError('Please enter both email and password.');
          return;
        }
      
        try {
          console.log('Attempting login with:', { email, role }); // Log attempt
      
          const response = await fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              role
            }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log('Login response:', data); // Log response
          
          if (True) {
            setLoginError('');
            setUserId(data.userId);
            setStep(2);
          } else {
            setLoginError(data.message || 'Invalid email or password.');
          }
        } catch (error) {
        //   console.error('Login error details:', error); // Log detailed error
        //   setLoginError('An error occurred during login. Please try again.');
            setStep(2);
        }
      };

  const handleAnswer = async (optionIndex) => {
    const question = questions[currentQuestion];
    const selectedOption = question.options[optionIndex];
    
    const preferenceOrStyle = selectedOption.style || selectedOption.preference;
    
    const newAnswers = [...answers, {
      questionNumber: currentQuestion + 1,
      answerIndex: optionIndex,
      ...(role === 'student' 
        ? { learningPreference: preferenceOrStyle }
        : { teachingStyle: preferenceOrStyle }
      )
    }];
    
    setAnswers(newAnswers);
  
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
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
        
        // Process the responses to calculate percentages
        const styleCounts = {};
        const preferenceCounts = {};
        
        newAnswers.forEach(answer => {
          const question = questions[answer.questionNumber - 1];
          const option = question.options[answer.answerIndex];
          
          if (option.style) {
            styleCounts[option.style] = (styleCounts[option.style] || 0) + 1;
          }
          if (option.preference) {
            preferenceCounts[option.preference] = (preferenceCounts[option.preference] || 0) + 1;
          }
        });
  
        // Calculate percentages
        const stylePercentages = Object.entries(styleCounts).map(([style, count]) => ({
          name: style,
          percentage: ((count / 4) * 100).toFixed(2)
        }));
  
        const preferencePercentages = Object.entries(preferenceCounts).map(([preference, count]) => ({
          name: preference,
          percentage: ((count / 3) * 100).toFixed(2)
        }));
  
        setStylePercentages(stylePercentages);
        setPreferencePercentages(preferencePercentages);
        
        if (data.matches) {
          // Assuming the backend now sends matches with TA names included
          setMatches(data.matches);
        }
        setStep(3);
      } catch (error) {
        console.error('Error submitting responses:', error);
      }
    }
  };

  const calculateResults = () => {
    const styleCounts = {};
    const preferenceCounts = {};
    const totalStyleQuestions = 4;
    const totalPreferenceQuestions = 3;
    
    answers.forEach(answer => {
      if (answer.style) {
        styleCounts[answer.style] = (styleCounts[answer.style] || 0) + 1;
      }
      if (answer.preference) {
        preferenceCounts[answer.preference] = (preferenceCounts[answer.preference] || 0) + 1;
      }
    });
    
    const stylePercentages = Object.keys(styleCounts).map(style => ({
      name: style,
      percentage: ((styleCounts[style] / totalStyleQuestions) * 100).toFixed(2)
    }));
    
    const preferencePercentages = Object.keys(preferenceCounts).map(preference => ({
      name: preference,
      percentage: ((preferenceCounts[preference] / totalPreferenceQuestions) * 100).toFixed(2)
    }));
    
    setStylePercentages(stylePercentages);
    setPreferencePercentages(preferencePercentages);
  };


  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const goLogin = async (selectedRole) => {
    setRole(selectedRole);
    setStep(1);  // Immediately show the quiz

  };


  if (step === 0) {
    return (
      <div className="app-container">
        <Logo />
        <div className="landing">
          <h1>Ready to discover your style?</h1>
          <h2>Are you a...</h2>
          <div className="role-buttons">
            <button onClick={() => goLogin('student')}>Student</button>
            <button onClick={() => goLogin('ta')}>Teaching Assistant</button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    // Login Page
    return (
      <div className="app-container">
        <Logo />
        <div className="login">
          <button className="back-button" onClick={() => setStep(0)}>←</button>
          <h2>{role === 'student' ? 'Student Login' : 'TA Login'}</h2>
          <div>
            <label>UofT Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loginError && <p className="error">{loginError}</p>}
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  // changed quiz to step 2, we'll change this to dashboard later and shift all the stpes iwhtin the quiz down
  if (step === 2) {
    return (
      <div className="app-container min-h-screen bg-gray-100">
        <div className="flex min-h-[calc(100vh-100px)] p-6 gap-8">
          {/* Left Panel - Take the Quiz */}
          <div className="w-1/3 bg-white rounded-lg p-6 h-fit">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Welcome!</h2>
              {!quizTaken ? (
                <div>
                  <p className="mb-6">
                    Want to find out your {subject.toLowerCase()} style? Take our quick quiz to get matched with TAs that suit your learning preferences.
                  </p>
                  <br></br>
                  <button
                    onClick={() => startQuiz(role)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Take the Quiz
                  </button>
                  <br></br>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700">You've completed the quiz!</p>
                  <button
                    onClick={() => setStep(4)}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    View Your Results
                  </button>
                </div>
              )}
            </div>
          </div>
          <br></br>
          {/* Right Panel - Course Selection & Registered Courses */}
          <div className="w-2/3 bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Your Classes</h2>
    
            {/* Course selection dropdown */}
            <div className="course-selection">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="course-select"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.code} value={course.code}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
              <button
                onClick={addClass}
                className="add-class btn"
              >
                Add Class
              </button>
            </div>
    
            {/* Registered Courses */}
            <div>
              <p className="text-gray-700 font-medium">You are currently registered in:</p>
              <ul className="mt-2 space-y-2">
                {registeredClasses.length > 0 ? (
                  registeredClasses.map((course) => (
                    <p key={course.code} className="p-3 bg-gray-100 rounded-md shadow-sm">
                      <span className="font-semibold">{course.code}</span> - {course.name}  
                      <br />
                      <span className="text-sm text-gray-600">
                      </span>
                      <button onClick={() => {setStep(5); setSelectedCourse(course.code);}} className="mt-4 text-blue-600 hover:text-blue-800 font-semibold">
                        View Course Details →
                      </button>
                      <br></br>
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No classes yet! Add a class :)</p>
                )}
              </ul>
            </div>
  
          </div>
        </div>
      </div>
    );
  }


  if (step === 3) {
    return (
      <div className="app-container">
        <Logo />
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
           {currentQuestion === questions.length - 1 ? (
            <button onClick={() => {setStep(4); setQuizTaken(true);}} className="finish-button">
              Finish Quiz
            </button>
          ) : null}
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
const styleDescriptions = {
    'Visual': "You learn best through visual aids like diagrams, charts, and images. Visual learners excel at understanding information when it's presented in a graphical format.",
    'Auditory': 'You learn effectively by listening and discussing. Auditory learners benefit from lectures, group discussions, and verbal explanations.',
    'Kinesthetic': 'You learn through hands-on experience and physical activity. Kinesthetic learners thrive when they can touch, move, and interact with learning materials.',
    'Reading/Writing': 'You prefer learning through written words. Reading/writing learners excel at taking notes, reading textbooks, and writing summaries of information.'
};

const preferenceDescriptions = {
    'Lecture-style': 'You appreciate structured presentations where an instructor explains concepts thoroughly. This traditional approach helps you grasp complex ideas systematically.',
    'Discussion': 'You thrive in interactive environments where ideas are exchanged freely. Group discussions help you understand different perspectives and deepen your understanding.',
    'Guided Practice': 'You learn best when theory is combined with practical application under instructor supervision. This balanced approach helps you build confidence while mastering new skills.',
    'Independent': 'You excel at self-directed learning and prefer to work at your own pace. This approach allows you to deeply explore topics that interest you.'
};

const normalizeKey = (key) => key.trim().toLowerCase();

// Get the highest percentage style and preference
const topStyle = stylePercentages.length > 0 ? stylePercentages.reduce((max, item) => item.percentage > max.percentage ? item : max, stylePercentages[0]) : null;
const topPreference = preferencePercentages.length > 0 ? preferencePercentages.reduce((max, item) => item.percentage > max.percentage ? item : max, preferencePercentages[0]) : null;

const getMatchedTAs = () => {
    if (!topStyle) return []; // No matches if topStyle isn't set
  
    return taMatches.filter(ta => 
      ta.style.toLowerCase() === topStyle.name.toLowerCase()
    );
  };
  
  // Call this function only when needed
  const matchedTAs = getMatchedTAs();
  

  if (step === 5) {
    return (
      <div className="app-container">
          <h2 className="text-2xl font-bold mb-4">Course Matches</h2>
  
          {selectedCourse ? (
            <>
              <p className="text-lg font-medium text-gray-800">
                Viewing details for <span className="font-bold">{selectedCourse}</span>
              </p>
  
              {quizTaken ? (
                <>
                  <h3 className="text-xl font-semibold mt-6">Top TA Matches:</h3>
                  {matchedTAs.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                      {matchedTAs.map((match, index) => (
                        <p key={index} className="p-3 bg-gray-100 rounded-md shadow-sm">
                          <span className="font-semibold">{match.name}</span>
                          <br></br>
                          <p className="text-sm text-gray-600">{match.email}</p>
                          <br></br>
                          <p className="text-sm text-gray-600">Matching Style: {match.style}</p>
                          <br></br>
                          <p className="text-sm text-gray-600">Teaching Preference: {match.preference} (Your preference for this was {match.preferencePercentage}%)</p>
                        </p>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-red-500 font-medium">No matches found for this course.</p>
                  )}
                </>
              ) : (
                <p className="mt-4 text-red-500 font-medium">Oops! You can't match with a TA without taking the quiz first...</p>
              )}
            </>
          ) : (
            <p className="text-gray-500 italic">No course selected.</p>
          )}
          <button onClick={() => { setStep(2); setSelectedCourse(null); }}>Dashboard</button>
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
                  <h3 className="mt-12 text-center">{match.ta_name}</h3>
                  <p className="text-gray-700 mt-4 text-left leading-relaxed">Matching Styles: {match.matching_styles}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p></p>
        )}
        <br></br>
        
        {/* Results Section */}
        <div className="results">
          <h2 className="mt-12 text-center">{subject} Style:</h2>
          {topStyle ? (
            <p className="text-gray-700 mt-4 text-left leading-relaxed">
              <strong>{topStyle.name.charAt(0).toUpperCase() + topStyle.name.slice(1).toLowerCase()}</strong> ({topStyle.percentage}%): 
              {" " + styleDescriptions[Object.keys(styleDescriptions).find(
                key => normalizeKey(key) === normalizeKey(topStyle.name)
              )] || "No description available."}
            </p>
          ) : (
            <p className="text-gray-700 mt-4 text-left leading-relaxed">No style preferences recorded.</p>
          )}
          <br></br>
  
          <h2 className="mt-12 text-center">{subject} Preferences:</h2>
          {topPreference ? (
            <p className="text-gray-700 mt-4 text-left leading-relaxed">
              <strong>{topPreference.name.charAt(0).toUpperCase() + topPreference.name.slice(1).toLowerCase()}</strong> ({topPreference.percentage}%): 
              {" " + preferenceDescriptions[Object.keys(preferenceDescriptions).find(
                key => normalizeKey(key) === normalizeKey(topPreference.name)
              )] || "No description available."}
            </p>
          ) : (
            <p className="text-gray-700 mt-4 text-left leading-relaxed">No other preferences recorded.</p>
          )}
        </div>
        <br></br>

        <button onClick={() => {
          setRole(null);
          setStep(3);
          setCurrentQuestion(0);
          setAnswers([]);
          setMatches([]);
        }}>Start Over</button>
        <button onClick={() => {
          setStep(2);
        }}>Dashboard</button>
      </div>
    </div>
  );
}
export default App;
