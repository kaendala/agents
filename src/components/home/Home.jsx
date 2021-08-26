import "./Home.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeIncome } from "../../redux/actions/income.action";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const dispach = useDispatch();
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const inputChange = (evt) => {
    const regex = /[0-9]*/;
    const validValues = regex.exec(evt.target.value);
    setInputValue(validValues[0]);
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
        <input
          type="tel"
          required={true}
          id="income"
          maxLength={5}
          minLength={5}
          onChange={inputChange.bind(this)}
          autoComplete="off"
          value={inputValue}
        ></input>
        <h4 className={"error" + (error ? " show" : "")}>
          {"Must be 5 numbers"}
        </h4>
        <div className="contentButton">
          <button
            disabled={error || error === null}
            onClick={() => {
              dispach(changeIncome(parseInt(inputValue)));
              history.push("/agents");
            }}
          >
            Get matches
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
