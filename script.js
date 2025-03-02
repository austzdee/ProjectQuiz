const questions = [
    {
      question: 'What is the capital of France?',
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: 2
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correct: 0
    },
    {
      question: 'What is the largest mammal in the world?',
      options: ["African Elephant", "Blue Whale", "Giraffe", "White Rhino"],
      correct: 1
    },
    {
      question: 'What is the capital of Japan?',
      options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
      correct: 2
    },
    {
      question: 'Which element has the chemical symbol "O"?',
      options: ["Gold", "Oxygen", "Iron", "Silver"],
      correct: 1
    },
    {
      question: 'What is the smallest prime number?',
      options: ["1", "2", "3", "5"],
      correct: 1
    },
    {
      question: 'Which ocean is the largest?',
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correct: 3
    },
    {
      question: 'Who wrote "Romeo and Juliet"?',
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
      correct: 1
    },
  ];

  let currentQuestion = 0;
  let userAnswers = [];

  function loadQuestion() {
    const questionElem = document.getElementById("question");
    const optionsElem = document.getElementById("options");

    questionElem.textContent = questions[currentQuestion].question;
    optionsElem.innerHTML = "";

    questions[currentQuestion].options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => selectAnswer(index);
      if (userAnswers[currentQuestion] === index) {
        button.style.background = "#32CD32";
      }
      optionsElem.appendChild(button);
    });

    document.getElementById("prev").disabled = currentQuestion === 0;
    document.getElementById("next").textContent = currentQuestion === questions.length - 1 ? "Submit" : "Next";
  }

  function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    loadQuestion();
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      showResult();
    }
  }

  function prevQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  }

  function showResult() {
    let correctAnswers = 0;
    let resultHTML = "<h2>Quiz Results</h2>";

    questions.forEach((q, index) => {
      const isCorrect = userAnswers[index] === q.correct;
      if (isCorrect) correctAnswers++;

      resultHTML += `<p>${q.question}<br>
                               Your Answer: <span style="color: ${isCorrect ? '#59ff59' : 'red'}">${q.options[userAnswers[index]] || 'No Answer'}</span><br>
                               Correct Answer: <span style="color: #59ff59">${q.options[q.correct]}</span></p>`;
    });

    resultHTML += `<h3>Your Score: ${correctAnswers} / ${questions.length}</h3>`;
    document.getElementById("question-container").style.display = "none";
    document.getElementById("result").innerHTML = resultHTML;
    document.getElementById("result").style.display = "block";
    document.getElementById("prev").style.display = "none";
    document.getElementById("next").style.display = "none";
  }

  loadQuestion();