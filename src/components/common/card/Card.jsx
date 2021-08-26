import "./Card.scss";
import React from "react";

const Card = ({ agent }) => {
  return (
    <div className="card">
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
      <h2 className="name">
        <strong>{agent.name}</strong>
      </h2>
      <h3 className="id">ID: {agent.id}</h3>
      <div className="income">
        Income &nbsp;<strong>{agent.income}</strong>
      </div>
    </div>
  );
};

export default Card;
