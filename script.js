let screen = document.getElementById("screen")
let rows = document.querySelectorAll(".row")
let numBtn = document.querySelectorAll(".num")
let addBtn = document.querySelector("#add")
let subBtn = document.querySelector("#subtract")
let mulBtn = document.querySelector("#multiply")
let divBtn = document.querySelector("#divide")
let eqBtn = document.querySelector("#equals")
let clBtn = document.querySelector("#clear")

let MAX_NUMBER = 99999999999

let num1
let num2
let op
let result

numBtn.forEach((e) => {
    e.addEventListener("click", () => {
        if (!num1) {
            num1 = e.textContent
            screen.value = num1
        }
        else if (num1 && !op) {
            num1 += e.textContent
            screen.value = num1

        }
        else if (num1 && op && !num2) {
            num2 = e.textContent
            screen.value = num2
        }
        else {
            num2 += e.textContent
            screen.value = num2
        }
    })
})

addBtn.addEventListener("click", () => {
    if (num1 && num2 && op) {
        screen.value = operate(num1, num2, op)
    }
    num2 = ""
    op = add
    addBtn.style.opacity = 0.5
    subBtn.style.opacity = 1
    mulBtn.style.opacity = 1
    divBtn.style.opacity = 1
})

subBtn.addEventListener("click", () => {
    if (num1 && num2 && op) {
        screen.value = operate(num1, num2, op)
    }
    num2 = ""
    op = subtract
    addBtn.style.opacity = 1
    subBtn.style.opacity = 0.5
    mulBtn.style.opacity = 1
    divBtn.style.opacity = 1
})

mulBtn.addEventListener("click", () => {
    if (num1 && num2 && op) {
        screen.value = operate(num1, num2, op)
    }
    num2 = ""
    op = multiply
    addBtn.style.opacity = 1
    subBtn.style.opacity = 1
    mulBtn.style.opacity = 0.5
    divBtn.style.opacity = 1
})

divBtn.addEventListener("click", () => {
    if (num1 && num2 && op) {
        screen.value = operate(num1, num2, op)
    }
    num2 = ""
    op = divide
    addBtn.style.opacity = 1
    subBtn.style.opacity = 1
    mulBtn.style.opacity = 1
    divBtn.style.opacity = 0.5
})

eqBtn.addEventListener("click", func => {
    if (!num1 || !num2 || !op) {
        return
    }
    screen.value = operate(num1, num2, op)
})

clBtn.addEventListener("click", () => {
    num1 = ""
    num2 = ""
    op = ""
    screen.value = ""
    addBtn.style.opacity = 1
    subBtn.style.opacity = 1
    mulBtn.style.opacity = 1
    divBtn.style.opacity = 1
})

function operate(x, y, f) {
    result = f(parseInt(x), parseInt(y))
    num1 = result
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
    return (x / y).toPrecision(5)
}