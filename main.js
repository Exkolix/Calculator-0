const display = document.getElementById("display");

function addToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value); // Use eval for simplicity
    } catch (error) {
        display.value = "Error"; // Handle invalid expressions
    }
}
