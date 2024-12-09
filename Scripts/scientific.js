// Handle the scientific section toggle and features
const scientificSection = document.getElementById("scientificSection");
const container = document.getElementById("container");

// Toggle between Basic and Scientific Mode
function toggleScientific() {
    if (scientificSection.style.display === "none") {
        scientificSection.style.display = "block";  // Show scientific section
        container.classList.add("expanded");  // Expand the container
    } else {
        scientificSection.style.display = "none";  // Hide scientific section
        container.classList.remove("expanded");  // Shrink the container back
    }
}

// Scientific Calculator Functions (Square, Cube, etc.)
function square() {
    currentInput = Math.pow(parseFloat(currentInput), 2).toString();
    display.value = formatWithCommas(currentInput);
}

function cube() {
    currentInput = Math.pow(parseFloat(currentInput), 3).toString();
    display.value = formatWithCommas(currentInput);
}

function inverse() {
    currentInput = (1 / parseFloat(currentInput)).toString();
    display.value = formatWithCommas(currentInput);
}

function calculateScientific() {
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


