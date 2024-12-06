// Display functions
function addToDisplay(value) {
    if (value === ".") {
        // Prevent multiple decimal points
        if (currentInput.includes(".")) return;
    }

    if (display.value === "0" || currentInput === "0") {
        currentInput = value;
    } else {
        currentInput += value;
    }

    display.value = formatWithCommas(currentInput);
}

// Format numbers with commas
function formatWithCommas(value) {
    if (value.includes(".")) {
        // Split into integer and decimal parts
        const [integer, decimal] = value.split(".");
        return parseInt(integer, 10).toLocaleString() + "." + decimal;
    }
    // Format integer part only
    return parseInt(value, 10).toLocaleString();
}

function addOperator(operator) {
    if (currentInput === "") return;
    
    equation += currentInput + operator;
    secDisplay.value = equation; 
    currentInput = ""; 
    display.value = "0";
}

// Clear/Delete button behavior
function deleteOrClear() {
    if (clearTimeoutId) {
        clearTimeout(clearTimeoutId);
    }

    if (currentInput.length > 0) {
        // Delete the last character of the current input
        currentInput = currentInput.slice(0, -1);
        display.value = formatWithCommas(currentInput) || "0"; // Display "0" if input is empty
    } else if (equation.length > 0) {
        // Remove the last character from the equation if currentInput is empty
        equation = equation.slice(0, -1);
        secDisplay.value = equation;
    }
}

function clearDisplay() {
    currentInput = "";
    equation = "";
    display.value = "0";
    secDisplay.value = "";
}

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
    currentInput = (parseFloat(currentInput) / 100).toString();
    display.value = formatWithCommas(currentInput);
}

function calculate() {
    if (currentInput !== "") {
        equation += currentInput;
    }
    try {
        const result = eval(equation.replace("×", "*").replace("÷", "/"));
        display.value = formatWithCommas(result.toString());
        secDisplay.value = equation + " =";
        equation = "";
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
    }
}
