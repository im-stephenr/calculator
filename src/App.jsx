import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Button from "./components/Button";

const button_values = [
  "AC",
  "DEL",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

const operands = ["DEL", "%", "/", "*", "-", "+", "=", "."];

function App() {
  const [inputDisplay, setInputDisplay] = useState("0");
  const [answerDisplay, setAnswerDisplay] = useState("0");

  const handleButtonClick = (value) => {
    let newVal;
    switch (value) {
      case "AC":
        setInputDisplay("0");
        break;
      case "=":
        calculate();
        break;
      case "DEL":
        handleDel(inputDisplay);
        break;
      default:
        // if initial value is zero
        if (inputDisplay === "0") {
          // if initial input is not a number then remain zero
          if (operands.indexOf(value) != -1) {
            // remain state value to zero
            return setInputDisplay("0");
          } else {
            // remove the initial value zero
            newVal = "" + value;
          }
        } else {
          // get the last character of state
          let last_character = inputDisplay.charAt(inputDisplay.length - 1);
          // if last character is an operand and also the current input then output should remain to prevent double operands
          if (
            operands.indexOf(last_character) != -1 &&
            operands.indexOf(value) != -1
          ) {
            newVal = inputDisplay;
          } else {
            newVal = inputDisplay + value;
          }
        }
        return setInputDisplay(newVal);
    }
    console.log(inputDisplay);
  };

  const calculate = () => {
    try {
      let result = eval(inputDisplay);
      setAnswerDisplay(result);
    } catch (err) {
      return;
    }
  };

  const handleDel = (input) => {
    console.log("REMOVE LAST CHAR");
    setInputDisplay((input) => input.slice(0, -1));
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>Calculator</h2>
      <div className="card">
        <div className="calculator-container">
          <div className="calculator-output__container">
            <div className="calculator-output__display">
              <span className="calculator-text__display">{answerDisplay}</span>
            </div>
            <div className="calculator-input__display">
              <span className="calculator-text__display">{inputDisplay}</span>
            </div>
          </div>
          <div className="calculator-inputs__container">
            {button_values.map((button) => (
              <Button
                handleClick={handleButtonClick}
                key={button}
                text={button}
                class={
                  (["/", "*", "-", "+", "="].indexOf(button) != -1 &&
                    "last-column") ||
                  (button === "0" && "input_grid-zero")
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
