// initializing variables for html button elements
let screen = document.getElementById("screen")
let rows = document.querySelectorAll(".row")
let numBtn = document.querySelectorAll(".num")
let opBtn = document.querySelectorAll(".operator")
let eqBtn = document.querySelector("#equals")
let clBtn = document.querySelector("#clear")
let decBtn = document.querySelector("#decimal")
let plusNegBtn = document.querySelector("#plusNeg")

// listening for keyboard input across whole document
document.addEventListener("keydown", handleKeyboardInput)

// setting max allowed for screen size
let MAX_NUMBER = 99999999999

let num1 = ""
let num2 = ""
let op = ""
let result
let justCalculated = false
screen.value = 0

//arrays containing allowed keyboard inputs
allowedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
allowedOperators = ["+", "-", "/", "*"]

numBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        handleNumberInput(e.target.textContent)
    })
})

opBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        handleOperatorInput(e.target.textContent)
    })
})

plusNegBtn.addEventListener("click", () => {
    if (num2) {
        num2 = toggleNegative(num2)
        screen.value = num2
    }
    else if (num1) {
        num1 = toggleNegative(num1)
        screen.value = num1
    }
})

eqBtn.addEventListener("click", handleEqualsInput)
decBtn.addEventListener("click", handleDecimalInput)
clBtn.addEventListener("click", clear)

function handleKeyboardInput(event) {
    const key = event.key

    if (allowedNumbers.includes(key)) {
        handleNumberInput(key)
    }
    else if (allowedOperators.includes(key)) {
        handleOperatorInput(key)
    }
    else if (key === ".") {
        handleDecimalInput()
    }
    else if (key === "Enter" || key === "=") {
        handleEqualsInput()
    }
    else if (key === "Escape") {
        handleClearInput()
    }
}

function handleNumberInput(number) {
    if ((num1.length > 11 && !op) || (num2.length > 11 && op)) return
    if (justCalculated) {
        clear()
        justCalculated = false
    }
    if (number === 0) {
        if (num1.startsWith("0") || num2.startsWith("0")) {
            return
        }
    }
    if (!num1) {
        num1 = number
        screen.value = num1
    }
    else if (num1 && !op) {
        num1 += number
        screen.value = num1
    }
    else if (num1 && op && !num2) {
        num2 = number
        screen.value = num2
    }
    else if (num2 && op) {
        num2 += number
        screen.value = num2
    }
}

function handleOperatorInput(operator) {
    if (justCalculated) {
        num2 = ""
        justCalculated = false
    }
    else if (num1 && num2 && op) {
        screen.value = operate(num1, num2, op)
    }
    num2 = ""
    switch(operator) {
        case "+":
            op = add
            break
        case "-":
            op = subtract
            break
        case "*":
            op = multiply
            break
        case "/":
            op = divide
            break
    }
    resetOpacity(operator)
}

function handleClearInput() {
    clear()
}

function handleEqualsInput() {
    if (!num1 || !num2 || !op) return
    screen.value = operate(num1, num2, op)
    justCalculated = true
}

function handleDecimalInput() {
    if (num1 && !op) {
        if (!num1.includes(".")) {
            num1 += "."
            screen.value = num1
        }
    }
    else if (!num1 && !op) {
        num1 = "0."
        screen.value = num1
    }
    else if (num2) {
        if (!num2.includes(".")) {
            num2 += "."
            screen.value = num2
        }
    }
    else if (op && !num2) {
        num2 = "0."
        screen.value = num2
    }
}

function operate(x, y, f) {
    result = f(parseFloat(x), parseFloat(y))
    num1 = String(result)
    if (result > MAX_NUMBER) {
        return result = result.toPrecision(6)
    }
    else if (isNaN(result)) {
        return "ERROR"
    }
    else return result
}

function add(x, y) {
    return x + y
}

function subtract(x, y) {
    return x - y
}

function multiply(x, y) {
    return x * y
}

function divide(x, y) {
    if (x === 0 || y === 0) {
        return NaN
    }
    if (Number.isInteger(x / y)) {
        return (x / y)
    }
    else return (x / y).toPrecision(5)
}

function toggleNegative(value) {
    value = String(value);
    return value.startsWith("-") ? value.slice(1) : "-" + value;
}

function clear() {
    num1 = ""
    num2 = ""
    op = ""
    screen.value = 0
    result = ""
    resetOpacity()
}

function resetOpacity(operator) {
    opBtn.forEach(btn => {
        btn.style.opacity = 1
        if (operator === btn.id) {
            btn.style.opacity = 0.5
        }
    })
}