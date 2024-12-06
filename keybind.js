// Takes in keyboard input
document.addEventListener("keydown", handleKeyPress);

// Get the key pressed
function handleKeyPress(event) {
    const key = event.key; 

    if (!isNaN(key)) {
        addToDisplay(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        addOperator(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault(); // Prevent form submission if in a form
        calculate();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === ".") {
        addToDisplay(".");
    }
}
