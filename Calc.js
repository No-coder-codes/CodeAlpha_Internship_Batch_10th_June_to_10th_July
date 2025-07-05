let currentInput = "";
let previousInput = "";
let operation = null;
let shouldResetScreen = false;
let fullExpression = "";
// "var" pehle ke time me functions oriented type banaya tha aaj ke time isko avoid krna chahiye, yeh chize globally change kr deta hai kisi bhi variable ki 
// jab ki "let" block specific rehta hai, yeh hamari zarurat ke according agar ham vairbale me value badalna chahe toh badal dega specifc block ke according bagair globally chedkhani kiye
// "const" me ham chize reassign nhi kr sakte but property badal sakte hai matlab mein kisi bache ke lunchbox me se directly uske piche se lunch nhi kha/badal sakta hu
// balki us variable us bache ko call krne ka fir kehne ka tiffin lekar aao fir khao/badal do
// Ex const kid = {Lunch : "Shahi Paneer"};
// toh kid = {Lunch : "Mess ki phul gobhi"} yeh kaam nhi karega
// this is how it works kid.Lunch = "phul gobhi"
const resultDisplay = document.getElementById("result");

// Number buttons (0-9 and .)
document
  .querySelectorAll(
    ".buttons button:not(.operator):not(.equals):not(.clear):not(.delete)"
  )
  .forEach((button) => {
    button.addEventListener("click", () => {
      if (shouldResetScreen) {
        currentInput = "";
        shouldResetScreen = false;
      }
      currentInput += button.textContent;
      updateDisplay();
    });
  });

// Operator buttons (+, -, ×, ÷)
document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentInput === "" && previousInput === "") return;

    if (operation !== null) calculate();

    operation = button.textContent;
    previousInput = currentInput;
    fullExpression = `${previousInput} ${operation}`;
    currentInput = "";
    updateDisplay();
  });
});

// Equals button
document.querySelector(".equals").addEventListener("click", () => {
  if (operation && previousInput && currentInput) {
    calculate();
    fullExpression = "";
  }
});

// Clear button
document.querySelector(".clear").addEventListener("click", clearScreen);

// Delete button
document.querySelector(".delete").addEventListener("click", deleteLastChar);

function updateDisplay() {
  resultDisplay.value = fullExpression + currentInput;
}

function calculate() {
  if (!operation || !previousInput || !currentInput) return;

  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      return;
  }

  currentInput = computation.toString();
  previousInput = "";
  operation = null;
  fullExpression = "";
  updateDisplay();
}

function clearScreen() {
  currentInput = "";
  previousInput = "";
  operation = null;
  fullExpression = "";
  updateDisplay();
}

function deleteLastChar() {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }
}
