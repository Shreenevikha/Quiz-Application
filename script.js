const quizData = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
      answer: 'Jupiter',
    },
    {
      question: 'Which country won the Cricket World Cup in 2024?',
      options: ['India', 'South Africa', 'Australia', 'England'],
      answer: 'India',
    },
    {
      question: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
      answer: 'Mount Everest',
    },
    {
      question: 'Which is the largest ocean on Earth?',
      options: ['Pacific Ocean','Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean' ],
      answer: 'Pacific Ocean',
    },
    {
      question: 'What is a group of crows called?',
      options: ['A pack', 'A flock', 'A murder', 'A caw'],
      answer: 'A murder',
    },
    {
      question: 'What country does sushi originate from?',
      options: ['China','Korea','Thailand','Japan'],
      answer: 'Japan',
    },
    {
      question: 'Who is the author of the "Harry Potter" series?',
      options: ['J.D. Salinger', 'Roald Dahl', 'Suzanne Collins', 'J.K. Rowling' ],
      answer: 'J.K. Rowling',
    },
    {
      question: 'What is the largest species of shark?',
      options: ['Great White Shark', 'Whale Shark', 'Tiger Shark', 'Hammerhead Shark' ],
      answer: 'Whale Shark',
    },
    {
      question: 'Which animal is known as the King of the Jungle?',
      options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
      answer: 'Lion',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  const previewButton = document.getElementById('preview'); // Add this line
  const nextButton = document.getElementById('next'); // Add this line
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  
    // Update button visibility
    previewButton.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentQuestion === quizData.length - 1 ? 'none' : 'inline-block';
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
        
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    previewButton.style.display = 'none';
    nextButton.style.display = 'none';
    
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    if(score<quizData.length)
      alert('OOPS!! YOU LOST');
    else
    alert('CONGRATULATIONS!! You Won');
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    previewButton.style.display = 'none';
    nextButton.style.display = 'inline-block';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
    previewButton.style.display = 'none';
    nextButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      displayQuestion();
    }
  }
  
  function previewQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      displayQuestion();
    }
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  nextButton.addEventListener('click', nextQuestion); // Add this line
  previewButton.addEventListener('click', previewQuestion); // Add this line
  
  displayQuestion();