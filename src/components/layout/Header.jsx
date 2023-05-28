/* eslint-disable no-unused-vars */
import React from "react";
import { FaMoon } from "react-icons/fa";

import Logo from "../../assets/logo.png";
const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="logo">
          <img src={Logo} alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add">
              <button aria-label="Quick add task" type="button">
                +
              </button>
            </li>
            <li className="settings__darkmode">
              <button aria-label="Darkmode on/off" type="button">
                <FaMoon />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
