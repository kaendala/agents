import "./Home.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeIncome } from "../../redux/actions/income.action";
import { formatNumber, removeCurrencyFormat } from "../../utils/number";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const dispach = useDispatch();
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const inputChange = (evt) => {
    const regex = /[0-9]*/;
    evt.target.value = removeCurrencyFormat(evt.target.value);
    const validValues = regex.exec(evt.target.value);
    setInputValue(formatNumber("en-US", "USD", 0, validValues[0]));
    if (evt.target.value.length !== 5) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <div className="home">
      <div className="contentImage">
        <img alt="person" src="/assets/images/Vector.png"></img>
      </div>
      <h1 className="title">Find the best agent for you!</h1>
      <h3 className="subtitle">
        Fill the information below to get your matches.
      </h3>
      <div id="incomeForm" className="contentInput">
        <h4 className="label">Current income</h4>
        <div className="iconinput">
          <span className="fas fa-dollar-sign"></span>
          <input
            type="text"
            required={true}
            id="income"
            maxLength={6}
            minLength={6}
            onChange={inputChange.bind(this)}
            autoComplete="off"
            value={inputValue}
          ></input>
        </div>

        <h4 className={"error" + (error ? " show" : "")}>
          {"Must be 5 numbers"}
        </h4>
        <div className="contentButton">
          <button
            disabled={error || error === null}
            onClick={() => {
              dispach(changeIncome(parseInt(removeCurrencyFormat(inputValue))));
              history.push("/agents");
            }}
          >
            Get matches<span className="fas fa-arrow-right"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
