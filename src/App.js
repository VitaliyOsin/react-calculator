import { useState } from "react";
import "./App.css";
import Calculator from "./components/calculator";
import { calc } from "./utils";

function App() {
  const [input, setInput] = useState("0");
  const [signFlag, setSignFlag] = useState(true);
  const [sign, setSign] = useState("");
  const [commaFlag, setCommaFlag] = useState([true, true]);
  const [startAgain, setStartAgain] = useState(false);

  const inputHandler = (m) => {
    setInput(m);
  };

  const resetHandler = () => {
    setInput("0");
    setSignFlag(true);
    setSign("");
    setCommaFlag([true, true]);
    setStartAgain(false);
  };

  const onBtn = (e) => {
    const { target } = e;

    if (target.textContent === "AC") {
      resetHandler();
      return;
    } else if (target.textContent === ".") {
      if (commaFlag || !startAgain) {
        inputHandler(input + target.textContent);
        setCommaFlag(false);
      }
    } else {
      if (input === "0" || startAgain) {
        inputHandler(target.textContent);
        setStartAgain(false);
      } else {
        inputHandler(input + target.textContent);
      }
    }
  };

  const onOpBtn = (e) => {
    const { target } = e;
    setSignFlag(false);
    setCommaFlag(true);
    setStartAgain(false);
    if (signFlag) {
      inputHandler(input + target.textContent);
      setSign(target.textContent);
    }
  };

  const equalHandler = () => {
    try {
      let arr;
      if (sign) {
        arr = input.split(sign);
        if (arr[1] === "") arr[1] = arr[0];
        else if (arr[0] === "") arr[0] = "0";
      } else {
        return;
      }
      const res = calc(arr[0], arr[1], sign);

      res ? setInput(res) : setInput(isNaN(res) ? "Ой!" : res);
      setCommaFlag(false);
      setSignFlag(true);
      setStartAgain(true);
      setSign("");
    } catch (err) {
      console.log("Ошибка ввода...");
      resetHandler();
      return;
    }
  };

  return (
    <Calculator
      input={input}
      equalHandler={equalHandler}
      onBtn={onBtn}
      onOpBtn={onOpBtn}
    />
  );
}

export default App;
