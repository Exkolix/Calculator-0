const display = document.getElementById("display");
const secDisplay = document.getElementById("secDisplay");
let currentInput = ""; // Tracks the current input
let equation = ""; // Tracks the full equation


// Display functions
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
// Clear button
function clearDisplay() {
    currentInput = "";
        equation = "";
        display.value = "0";
        secDisplay.value = "";
    }
    // Add event listeners to the "C" button
    const clearButton = document.getElementById("btnClear");
    clearButton.addEventListener("mousedown", handleClearPress); // Mouse hold
    clearButton.addEventListener("mouseup", handleClearRelease); // Mouse release
    clearButton.addEventListener("mouseleave", handleClearRelease); // Mouse leaves button
    clearButton.addEventListener("touchstart", handleClearPress); // Touch hold
    clearButton.addEventListener("touchend", handleClearRelease); // Touch release
    
    // Update Backspace Key Behavior
    document.addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
            handleClearRelease();
        }
    });
    let clearButtonTimer; // Timer for holding down the button

// Clear display or delete last character based on button press duration
function handleClearPress() {
    clearButtonTimer = setTimeout(() => {
        // Long press clears everything
        clearDisplay();
    }, 500); // 500ms for long press
}

function handleClearRelease() {
    clearTimeout(clearButtonTimer); // Cancel long press action if released early

    // Short press: perform backspace
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1); // Remove last character
        display.value = currentInput || "0"; // Update primary display
    } else if (equation.length > 0 && currentInput === "") {
        equation = equation.slice(0, -1); // Remove the last operator
        secDisplay.value = equation; // Update secondary display
    }
}

    // Special function
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


// Takes in keyboard input
document.addEventListener("keydown", handleKeyPress);

// Get the key pressed
function handleKeyPress(event) {
    const key = event.key; 

    if (!isNaN(key)) {
        // If the key is a number (0-9)
        simulateButtonPress(`btn${key}`);
        addToDisplay(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        // if Operators
        simulateButtonPress(`btn${key}`);
        addOperator(key);
    } else if (key === "Enter" || key === "=") {
        // Enter or equals key for calculation
        event.preventDefault(); // Prevent form submission if in a form
        simulateButtonPress("btnEquals");
        calculate();
    } else if (key === "Escape") {
        // Escape key for clear all
        simulateButtonPress("btnClear");
        clearDisplay();
    } else if (key === ".") {
        // Decimal point
        simulateButtonPress("btnDecimal");
        addToDisplay(".");
    }
}

// Simulate button press visually
function simulateButtonPress(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.classList.add("pressed");
        setTimeout(() => button.classList.remove("pressed"), 150); // Remove highlight after 150ms
    }
}




