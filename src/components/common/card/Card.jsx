import "./Card.scss";
import { formatCurrency } from "../../../utils/number";
import React from "react";

const Card = ({ agent, saveAgent }) => {
  return (
    <div className="card" onClick={() => saveAgent(agent)}>
      <div className="avatar">
        <img
          alt="avatar"
          src={
            agent.avatar === "F"
              ? "/assets/images/female.png"
              : "/assets/images/man.png"
          }
        ></img>
      </div>
      <div className="description">
        <h2 className="name">
          <strong>{agent.name}</strong>
        </h2>
        <h3 className="id">ID: {agent.id}</h3>
        <div className="income">
          Income &nbsp;
          <strong>{formatCurrency("en-US", "USD", 0, agent.income)}</strong>
        </div>
      </div>
    </div>
  );
};

export default Card;
