import "./Agents.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../common/card/Card";
import Select from "react-select";
import { useSelector } from "react-redux";

const Agents = () => {
  const [filterList, setFilterList] = useState(null);
  const [currentList, setCurrentList] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const rate = 10000;
  const inputValue = useSelector((state) => state.incomeReducer.income);

  const options = [
    { value: "name-asc", label: "Name A-Z" },
    { value: "name-des", label: "Name Z-A" },
    { value: "income-desc", label: "Income High-Low" },
    { value: "income-asc", label: "Income Low-High" },
  ];
  useEffect(() => {
    axios.get("/assets/json/AGENTS_LIST.json").then((res) => {
      if (res.data && res.data.length > 0) {
        const listFilt = res.data.filter((element) => {
          if (
            element.income <= inputValue + rate &&
            element.income >= inputValue - rate
          ) {
            return element;
          } else {
            return null;
          }
        });
        setFilterList(listFilt);
        setTotalPage(Math.ceil(listFilt.length / 3));
      }
    });
  }, [inputValue]);

  useEffect(() => {
    if (filterList && filterList.length > 0) {
      const list = filterList.filter((element, index) => {
        if (index + 1 <= page * 3) {
          return element;
        } else {
          return null;
        }
      });

      setCurrentList(list);
    }
    console.log(page, totalPage);
  }, [page, filterList]);

  const more = () => {
    if (page < totalPage) {
      let pageCurrent = page + 1;
      setPage(pageCurrent);
    }
  };
  const less = () => {
    if (page > 1) {
      let pageCurrent = page - 1;
      setPage(pageCurrent);
    }
  };

  return (
    <div className="agents">
      <h1 className="title">Your matches</h1>
      <h2 className="subtitle">
        Your income: <strong>{inputValue}</strong>
      </h2>
      <div className="cards">
        <div className="contentSelect">
          <h4 className="label">Order agents by</h4>
          <Select
            options={options}
            className="select"
            classNamePrefix="react-select"
          />
        </div>
        {currentList && currentList.length > 0 && (
          <div className="cardsContainer">
            {currentList.map((agent) => (
              <Card key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>
      <div className="contentButtons">
        <button className="link" onClick={() => less()} disabled={page === 1}>
          <h3>Show less -</h3>
        </button>
        <button
          className="link"
          onClick={() => more()}
          disabled={page === totalPage}
        >
          <h3>Show more +</h3>
        </button>
      </div>
    </div>
  );
};

export default Agents;
