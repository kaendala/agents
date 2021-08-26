import "./Agents.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../common/card/Card";
import Select from "react-select";
import { formatCurrency } from "../../utils/number";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Agents = () => {
  const history = useHistory();
  const [filterList, setFilterList] = useState(null);
  const [sort, setSort] = useState(null);
  const [currentList, setCurrentList] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const rate = 10000;
  const inputValue = useSelector((state) => state.incomeReducer.income);

  const options = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "income-desc", label: "Income: High first" },
    { value: "income-asc", label: "Income: Low first" },
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
      let list = filterList.filter((element, index) => {
        if (index + 1 <= page * 3) {
          return element;
        } else {
          return null;
        }
      });
      if (sort) {
        const type = sort.split("-")[0];
        const sortSelect = sort.split("-")[1];
        list = list.sort((a, b) => {
          if (sortSelect === "desc") return a[type] > b[type] ? -1 : 1;
          else {
            return b[type] > a[type] ? -1 : 1;
          }
        });
      }

      setCurrentList(list);
    } else {
      setCurrentList(null);
    }
  }, [page, filterList, sort]);

  const more = () => {
    let pageCurrent = page + 1;
    setPage(pageCurrent);
  };
  const less = () => {
    let pageCurrent = page - 1;
    setPage(pageCurrent);
  };

  const removeAgent = (agent) => {
    const id = agent.id;
    let list = filterList.filter((element) => {
      if (element.id !== id) {
        return element;
      } else {
        return null;
      }
    });
    setFilterList(list);
    const totalPage = Math.ceil(list.length / 3);
    setTotalPage(totalPage);
    if (page > totalPage) {
      setPage(totalPage);
    }
    saveAgent(agent);
  };
  const saveAgent = (agent) => {
    const savedAgents = JSON.parse(localStorage.getItem("agents"));
    if (savedAgents && savedAgents.length > 0) {
      savedAgents.push(agent);
      localStorage.setItem("agents", JSON.stringify(savedAgents));
    } else {
      localStorage.setItem("agents", JSON.stringify([agent]));
    }
  };

  return (
    <div className="agents">
      {currentList && currentList.length > 0 && (
        <div>
          <h1 className="title">Your matches</h1>
          <h2 className="subtitle">
            Your income:{" "}
            <strong>{formatCurrency("en-US", "USD", 0, inputValue)}</strong>
          </h2>
          <div className="cards">
            <div className="contentSelect">
              <h4 className="label">Order agents by</h4>
              <Select
                options={options}
                className="select"
                classNamePrefix="react-select"
                onChange={(e) => setSort(e.value)}
              />
            </div>
            <div className="cardsContainer">
              {currentList.map((agent) => (
                <Card key={agent.id} agent={agent} saveAgent={removeAgent} />
              ))}
            </div>
          </div>
          <div className="contentButtons">
            <button
              className="link"
              onClick={() => less()}
              disabled={page === 1}
            >
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
      )}
      {!currentList && (
        <div>
          <h1 className="noAgents">
            “No available Agents based on your income. Please try a different
            income value.”
          </h1>
          <button className="link" onClick={() => history.push("/")}>
            <h3>&#8592; Go back </h3>
          </button>
        </div>
      )}
    </div>
  );
};

export default Agents;
