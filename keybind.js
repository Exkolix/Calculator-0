// Takes in keyboard input
document.addEventListener("keydown", handleKeyPress);

// Get the key pressed
function handleKeyPress(event) {
    const key = event.key; 

    if (!isNaN(key)) {
        // If the key is a number (0-9)
        addToDisplay(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        // if Operators
        addOperator(key);
    } else if (key === "Enter" || key === "=") {
        // Enter or equals key for calculation
        event.preventDefault(); // Prevent form submission if in a form
        calculate();
    } else if (key === "Escape") {
        // Escape key for clear all
        clearDisplay();
    } else if (key === ".") {
        // Decimal point
        addToDisplay(".");
    }
}
