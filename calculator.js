console.log("JavaScript, HTML & CSS Calculator by Sergio Petersen")

document.getElementById("answer").readOnly = true;
let screen = document.getElementById("answer");
let screenTop = document.getElementById("savedAnswer");
let buttons = document.querySelectorAll("button");
let screenValue = "";
let operatorCounter = 0;
let bracketMultiplication = false;
function clear() {
    screenValue = "";
    screen.value = screenValue;
    console.clear();
    operatorCounter = 0;
    bracketMultiplication = false;
    screenTop.value = "";
}

class LengthError extends Error {
    constructor(message) {
        super(message);
        this.name = "lengthError";
        clear();
    }
}


for (item of buttons) {
    item.addEventListener("click", (e) => {
        let buttonText = e.target.innerText;
        console.log(screen.value.length);
        if (screen.value.replace(/\s/g, '').length <= 16) {
            if (bracketMultiplication == true) {
                operatorCounter = 0;
            }
            if (buttonText == "X") {
                operatorCounter++;
                if (operatorCounter == 2) {
                    getAnswer();
                    buttonText = " * ";
                    screenValue = screen.value + buttonText;
                    screen.value = screenValue;
                    operatorCounter = 1;
                }
                else {
                    buttonText = " * ";
                    screenValue += buttonText;
                    screen.value = screenValue;
                }
            }
            else if (buttonText == "C") {
                clear();
            }
            else if (buttonText == "=") {
                getAnswer();
            }
            else if (buttonText == "-") {
                operatorCounter++;
                if (operatorCounter == 2) {
                    getAnswer();
                    buttonText = " - ";
                    screenValue = screen.value + buttonText;
                    screen.value = screenValue;
                    operatorCounter = 1;
                }
                else {
                    buttonText = " - ";
                    screenValue += buttonText;
                    screen.value = screenValue;
                }
            }
            else if (buttonText == "+") {
                operatorCounter++;
                if (operatorCounter == 2) {
                    getAnswer();
                    buttonText = " + ";
                    screenValue = screen.value + buttonText;
                    screen.value = screenValue;
                    operatorCounter = 1;
                }
                else {
                    buttonText = " + ";
                    screenValue += buttonText;
                    screen.value = screenValue;
                }
            }
            else if (buttonText == '\u00F7') {
                operatorCounter++;
                if (operatorCounter == 2) {
                    getAnswer();
                    buttonText = " / ";
                    screenValue = screen.value + buttonText;
                    screen.value = screenValue;
                    operatorCounter = 1;
                }
                else {
                    buttonText = " / ";
                    screenValue += buttonText;
                    screen.value = screenValue;
                }
            }
            else if (buttonText == "(") {
                if (screenValue == "") {
                    buttonText = " ( ";
                    screenValue = screen.value + buttonText;
                    screen.value = screenValue;
                    bracketMultiplication = true;
                }
                else {
                    buttonText = " * (  ";
                    screenValue = screen.value + buttonText;
                    screen.value = screenValue;
                    bracketMultiplication = true;
                }
            }

            else if (buttonText == ")") {
                buttonText = " ) ";
                screenValue = screen.value + buttonText;
                screen.value = screenValue;
            }
            else {
                screenValue += buttonText;
                screen.value = screenValue;
            }
        }
        else {
            try {
                throw new LengthError("Expression too long!")
            }
            catch (e) {
                alert(e.message);
            }
        }
    }
    );
}


document.addEventListener("keydown", function (event) {
    console.log(event.which);
    if (screen.value.length <= 16) {
        if (bracketMultiplication == true) {
            operatorCounter = 0;
        }
        if (event.shiftKey == 57) {
            event.key = " ( ";
        }
        else if (event.shiftkey == 48) {
            event.key = " ) ";
        }
        else if (event.shiftkey == 53) {
            event.key = " % ";
        }
        if (event.keyCode == 88) {
            screenValue += " * ";
            screen.value = screenValue;
        }
        if (event.key <= 9) {
            screenValue += event.key;
            screen.value = screenValue;
        }
        if (event.key == "+" || event.key == "-" || event.key == "*" || event.key == "." || event.key == "/" || event.key == "%" || event.key == "(" || event.key == ")") {
            operatorCounter++;
            if (operatorCounter == 2) {
                getAnswer();
                screenValue += " " + event.key + " ";
                screen.value = screenValue;
                operatorCounter = 1;
            }
            else {
                screenValue += " " + event.key + " ";
                screen.value = screenValue;
            }
        }
        if (event.keyCode == 13 || event.keyCode == 187) {
            getAnswer();
        }
        else if (event.keyCode == 67) {
            clear();
        }
        else if (event.keyCode == 8) {
            screenValue = screenValue.slice(0, -1);
            screen.value = screenValue;
        }
        else if (event.keyCode == 46) {
            clear();
        }
    }
    else {
        try {
            throw new LengthError("Expression too long!")
        }
        catch (e) {
            alert(e.message);
        }
    }
}
);

function getAnswer() {

    try {
        let oldValue = screenValue;
        screenValue = eval(screenValue);
        screen.value = screenValue;
        screenTop.value = oldValue + " =";
    }
    catch (e) {
        alert("Multiple Operator Error!!!");
        screenValue = "";
        screen.value = screenValue;
        console.clear();
        operatorCounter = 0;
        bracketMultiplication = false;
        screenTop.value = "";
    }

}


