import React, { useEffect, useState } from "react";
import axios from "axios";
import { element } from "prop-types";

const Home = () => {
  const [list, setList] = useState();
  const [valueInput, setValueInput] = useState();
  const [filterList, setFilterList] = useState();
  const [currentList, setCurrentList] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const rate = 10000;
  useEffect(() => {
    axios.get("/assets/AGENTS_LIST.json").then((res) => {
      setList(res.data);
    });
  }, []);

  useEffect(() => {
    if (filterList && filterList.length > 0) {
      const list = filterList.map((element, index) => {
        if (index + 1 <= page * 3) {
          return <li>{element.name}</li>;
        }
      });

      setCurrentList(list);
    }
  }, [page, filterList]);

  const callList = () => {
    const listFilt = list.filter((element) => {
      if (
        element.income <= valueInput + rate &&
        element.income >= valueInput - rate
      ) {
        return element;
      }
    });
    setFilterList(listFilt);
    setTotalPage(listFilt.length / 3);
  };
  const addPage = () => {
    if (page < totalPage) {
      let pageCurrent = page + 1;
      setPage(pageCurrent);
    }
  };
  const lessPage = () => {
    if (page > 1) {
      let pageCurrent = page - 1;
      setPage(pageCurrent);
    }
  };
  return (
    <>
      <input
        maxLength={5}
        minLength={5}
        type="number"
        onChange={(e) => {
          setValueInput(parseInt(e.target.value));
        }}
      ></input>
      <button onClick={callList}>Match</button>
      <ul>{currentList}</ul>
      <button onClick={() => addPage()}>More</button>
      <button onClick={() => lessPage()}>less</button>
    </>
  );
};

export default Home;
