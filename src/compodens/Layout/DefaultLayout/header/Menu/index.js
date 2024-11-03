import React, { useState, useEffect, useRef } from "react";
import styles from "./Menu-module.scss";
import classnames from "classnames/bind";
import Logo1 from "./logo - Copy.png";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);
function Menu() {
  return (
    <div className="qmenu-item-duc">
      {" "}
      <Link to="/">
        {" "}
        <img className={cx("logo")} src={Logo1} />
      </Link>
    </div>
  );
}

export default Menu;
