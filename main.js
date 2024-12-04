const display = document.getElementById("display");
const secDisplay = document.getElementById("secDisplay");
let currentInput = ""; // Tracks the current input
let equation = ""; // Tracks the full equation

function addToDisplay(value) {
    if (display.value === "0" || currentInput === "0") {
        currentInput = value;
    } else {
        currentInput += value;
    }
    display.value = currentInput;
}

function addOperator(operator) {
    if (currentInput === "") return;

    equation += currentInput + operator;
    secDisplay.value = equation; 
    currentInput = ""; 
    display.value = "0";
}

function clearDisplay() {
    currentInput = "";
    equation = "";
    display.value = "0";
    secDisplay.value = "";
}

function toggleSign() {
    if (currentInput.startsWith("-")) {
        currentInput = currentInput.substring(1);
    } else {
        currentInput = "-" + currentInput;
    }
    display.value = currentInput;
}

function calculatePercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    display.value = currentInput;
}

function calculate() {
    if (currentInput !== "") {
        equation += currentInput;
    }
    try {
        const result = eval(equation.replace("×", "*").replace("÷", "/"));
        display.value = result;
        secDisplay.value = equation + " =";
        equation = "";
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
    }
}