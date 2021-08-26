import "./Header.scss";
import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  return (
    <div className="header">
      <img
        src={"assets/images/logo.png"}
        alt="Logo"
        onClick={() => history.push("/")}
        className="logo"
      ></img>
    </div>
  );
};

export default Header;
