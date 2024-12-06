function addToDisplay(value) {
    if (value === ".") {
        if (currentInput.includes(".")) return;
    }

    if (display.value === "0" || currentInput === "0") {
        currentInput = value;
    } else {
        currentInput += value;
    }

    display.value = formatWithCommas(currentInput);
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
function deleteLastCharacter() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || "0";
    } else if (equation.length > 0) {
        equation = equation.slice(0, -1);
        secDisplay.value = equation;
    }
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