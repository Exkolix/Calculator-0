const display = document.getElementById("display");
const secDisplay = document.getElementById("secDisplay");
let currentInput = ""; 
let equation = "";


function addToDisplay(value) {
    if (value === "." && currentInput.includes(".")) return; // Prevent multiple dots

    if (display.value === "0" && value === "0") {
        return; // Prevent multiple leading zeros
    }

    currentInput += value;
    display.value = formatWithCommas(currentInput);

    // Adjust font size dynamically
    adjustFontSize(display, 3, 1.5, 10); // Max font: 3rem, Min font: 1.5rem, Limit: 10 characters
}



function addOperator(operator) {
    if (currentInput === "") return;

    equation += currentInput + operator;
    secDisplay.value = equation;

    currentInput = "";
    display.value = "0";

    // Adjust font size for secondary display
    adjustFontSize(secDisplay, 1.3, 1, 25); // Max font: 1.3rem, Min font: 1rem, Limit: 25 characters
}


function clearDisplay() {
    currentInput = "";
    equation = "";
    display.value = "0";
    secDisplay.value = "";
}

function deleteLastCharacter() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || "0";
    } else if (equation.length > 0) {
        equation = equation.slice(0, -1);
        secDisplay.value = equation;
    }

    formatWithCommas()
}
let clearTimeoutId;

function handleClearDelete() {
    const clearButton = document.getElementById("clearButton");

    clearButton.addEventListener("mousedown", () => {
        clearTimeoutId = setTimeout(clearDisplay, 500);
    });

    clearButton.addEventListener("mouseup", () => {
        if (clearTimeoutId) {
            clearTimeout(clearTimeoutId);
            deleteLastCharacter();
        }
    });

    clearButton.addEventListener("mouseleave", () => {
        if (clearTimeoutId) {
            clearTimeout(clearTimeoutId);
        }
    });
}

// Call this function once after the DOM has loaded
handleClearDelete();


// Special function
function toggleSign() {
    if (currentInput.startsWith("-")) {
        currentInput = currentInput.substring(1);
    } else {
        currentInput = "-" + currentInput;
    }
    display.value = formatWithCommas(currentInput);
}

function calculatePercentage() {
    if (currentInput === "") return;
    currentInput = (parseFloat(currentInput || "0") / 100).toString();
    display.value = formatWithCommas(currentInput);
}


function calculate() {
    if (currentInput !== "") {
        equation += currentInput;
    }if (equation === "") return; // Prevent calculating an empty equation
    try {
        const result = Function(`'use strict'; return (${equation})`)();
        display.value = formatWithCommas(result.toString());
        secDisplay.value = equation + " =";

        equation = "";
        currentInput = result.toString();

        // Adjust font sizes
        adjustFontSize(display, 3, 1.5, 10);
        adjustFontSize(secDisplay, 1.3, 1, 25);
    } catch (e) {
        display.value = "Error";
    }
}

// Display design
function formatWithCommas(value) {
    if (value === "" || isNaN(value)) return "0"; // Default to "0" for empty or invalid values

    if (value.includes(".")) {
        // Handle numbers with decimal points
        const [integer, decimal] = value.split(".");
        const formattedInteger = integer ? parseInt(integer, 10).toLocaleString() : "0";
        return formattedInteger + "." + decimal;
    }

    // Format integer part only
    return parseInt(value, 10).toLocaleString();
}
function adjustFontSize(displayElement, maxFontSize, minFontSize, charLimit) {
    const contentLength = displayElement.value.length;
    const newSize = Math.max(minFontSize, maxFontSize - (contentLength - charLimit) * 0.2);
    displayElement.style.fontSize = contentLength > charLimit ? `${newSize}rem` : `${maxFontSize}rem`;
}

