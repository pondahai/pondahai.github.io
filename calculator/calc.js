// 取得元素
const result = document.getElementById("result");
const clear = document.getElementById("clear");
const sqrt = document.getElementById("sqrt");
const percent = document.getElementById("percent");
const divide = document.getElementById("divide");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const multiply = document.getElementById("multiply");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const subtract = document.getElementById("subtract");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const add = document.getElementById("add");
const zero = document.getElementById("zero");
const decimal = document.getElementById("decimal");
const equals = document.getElementById("equals");

// 變數
let input = "";
let operand1 = "";
let operand2 = "";
let operator = "";
let isOperatorClicked = false;
let Finish = true;

// 函式
function updateResult(value) {
  result.value = value;
  
}

function addInput(newInput) {
  if (input === "0" && newInput === "0") {
    return;
  }

  if (input === "0" || isOperatorClicked || Finish) {
    input = newInput;
    Finish = false;
  } else {
    input += newInput;
  }

  isOperatorClicked = false;
  updateResult(input);
}

function clearInput() {
  input = "0";
  operand1 = "";
  operand2 = "";
  operator = "";
  isOperatorClicked = false;
  Finish = true;

  updateResult(input);
}

function calculate() {
  switch (operator) {
    case "+":
      input = parseFloat(operand1) + parseFloat(input);
      break;
    case "-":
      input = parseFloat(operand1) - parseFloat(input);
      break;
    case "*":
      input = parseFloat(operand1) * parseFloat(input);
      break;
    case "/":
      input = parseFloat((parseFloat(operand1) / parseFloat(input)).toFixed(7));
      break;
//     case "sqrt":
//       input = Math.sqrt(parseFloat(input));
//       break;
//     case "%":
//       input = parseFloat(input) * (parseFloat(result.value) / 100);
//       break;
    default:
      break;
  }

  input = input.toString();
  operator = "";
  updateResult(input);
  Finish = true;
}

// 綁定事件
clear.addEventListener("click", () => {
  clearInput();
});

sqrt.addEventListener("click", () => {
  input = Math.sqrt(parseFloat(input));
  input = input.toString();
  updateResult(input);
//   operator = "sqrt";
//   calculate();
});

percent.addEventListener("click", () => {
  input = parseFloat(input) * 1 / 100);
  input = input.toString();
  updateResult(input);
//   operator = "%";
//   isOperatorClicked = true;
});

divide.addEventListener("click", () => {
  operator = "/";
  operand1 = input;
  isOperatorClicked = true;

});

seven.addEventListener("click", () => {
  addInput("7");
});

eight.addEventListener("click", () => {
  addInput("8");
});

nine.addEventListener("click", () => {
  addInput("9");
});

multiply.addEventListener("click", () => {
  operator = "*";
operand1 = input;
  isOperatorClicked = true;
});

four.addEventListener("click", () => {
  addInput("4");
});

five.addEventListener("click", () => {
  addInput("5");
});

six.addEventListener("click", () => {
  addInput("6");
});

subtract.addEventListener("click", () => {
  operator = "-";
operand1 = input;
  isOperatorClicked = true;
});

one.addEventListener("click", () => {
  addInput("1");
});

two.addEventListener("click", () => {
  addInput("2");
});

three.addEventListener("click", () => {
  addInput("3");
});

add.addEventListener("click", () => {
  operator = "+";
operand1 = input;
  isOperatorClicked = true;
});

zero.addEventListener("click", () => {
  addInput("0");
});

function handleDecimal() {
  if (input === "") {
    addInput("0.");
  } else if (!input.includes(".")) {
    addInput(".");
  }
}

decimal.addEventListener("click", () => {
  handleDecimal();
});

equals.addEventListener("click", () => {
  calculate();
});

// 監聽鍵盤事件
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    addInput(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    operator = key;
    isOperatorClicked = true;
  } else if (key === "%") {
    operator = "%";
    isOperatorClicked = true;
    calculate();
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Backspace") {
    input = input.slice(0, -1);
    updateResult(input);
  } else if (key === "Escape") {
    clearInput();
  }
});
