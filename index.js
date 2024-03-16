const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");
const numberScope = document.getElementById("scope");
const newParagraph = document.createElement("p");

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";

    // grammar improvement
    if (attempts === 1) {
      numberOfGuessesMessage.textContent = `You made ${attempts} guess`;
    } else {
      numberOfGuessesMessage.textContent = `You made ${attempts} guesses`;
    }

    correctMessage.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  checkScope(guess);

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      tooHighMessage.style.display = "";
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = "";

    // For security concerns limit the use of innerHtml
    numberOfGuessesMessage.textContent = `You guessed ${guess}.`;

    // grammar improvement
    if (remainingAttempts <= 1) {
      newParagraph.textContent = `${remainingAttempts} guess remaining.`;
      numberOfGuessesMessage.appendChild(newParagraph);
    } else {
      newParagraph.textContent = `${remainingAttempts} guesses remaining.`;
      numberOfGuessesMessage.appendChild(newParagraph);
    }
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = "";

  resetButton.style.display = "";
}

function hideAllMessages() {
  for (
    let elementIndex = 0;
    elementIndex <= messages.length - 1;
    elementIndex++
  ) {
    messages[elementIndex].style.display = "none";
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts.value = 5;
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
}

// additional feature - number scope between 1 and 99
function checkScope(numberGuessed) {
  if (numberGuessed < 1) {
    numberScope.style.display = "";
    numberScope.style.color = "red";
    numberScope.textContent = "Must be greater than 0";
  } else if (numberGuessed > 99) {
    numberScope.style.display = "";
    numberScope.style.color = "red";
    numberScope.textContent = "Must be less than 100";
  }
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
