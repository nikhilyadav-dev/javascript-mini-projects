let formEl = document.querySelector(".form");
const scoreEl = document.getElementById("score");
const pageQuestionEl = document.querySelector(".question");
console.log(pageQuestionEl);
let score = 0;
let correctAns;

const randomNmber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const randomQue = () => {
  const number1 = randomNmber(1, 10);
  const number2 = randomNmber(1, 10);
  const randomNum = randomNmber(1, 4);

  let firstNumber;
  let secondNumber;

  if (number1 > number2 && randomNum > 2) {
    firstNumber = number1;
    secondNumber = number2;
  } else {
    firstNumber = number2;
    secondNumber = number1;
  }

  let question;
  let answer;

  switch (randomNum) {
    case 1:
      question = `Q. what is ${firstNumber} multiply by ${secondNumber}`;
      answer = firstNumber * secondNumber;
      break;

    case 2:
      question = `Q. What is ${firstNumber} Add to ${secondNumber}`;
      answer = firstNumber + secondNumber;
      break;

    case 3:
      question = `Q. What is ${firstNumber} Divided by ${secondNumber}`;
      answer = firstNumber / secondNumber;
      break;

    case 4:
      question = `Q. What is ${firstNumber} Subtract from ${secondNumber}`;
      answer = firstNumber - secondNumber;
      break;
  }

  answer = Math.floor(answer);
  console.log(answer);
  return { answer, question };
};

const showQuestion = () => {
  const { question, answer } = randomQue();
  pageQuestionEl.innerText = question;
  correctAns = answer;
  // console.log(answer);
};

showQuestion();

const checkAnswer = (event) => {
  event.preventDefault();
  const formData = new FormData(formEl);
  let userAnswer = +formData.get("answer");
  // console.log(event.target);

  if (userAnswer === correctAns) {
    score += 1;
    Toastify({
      text: `Your are right and your score is ${score}`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    score -= 1;
    Toastify({
      text: `Your are wrong and your score is ${score}`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #e33217, #ff001e)",
      },
    }).showToast();
  }
  scoreEl.innerText = `Score -> ${score}`;
  event.target.reset();
  showQuestion();
};
