import React from "react";
import TestFabric7 from "../TestFabric7/TestFabric7";
import css from "./Layout.module.css";

import tay001 from "./tay001.jpg";
import tay002 from "./tay002.jpg";
import tay003 from "./tay003.jpg";

function Layout({ data }) {
  return (
    <div className={css.main}>
      <div className={css.topRow}>
        <div className={css.box}>
          <img src={tay001} alt="tay001" />
        </div>
        <div className={css.box}>
          <img src={tay002} alt="tay002" />
        </div>
        <div className={css.box}>
          <img src={tay003} alt="tay003" />
        </div>
        <div className={css.box}>
          <img src={tay003} alt="tay003" />
        </div>
        <div className={css.box}>
          <img src={tay003} alt="tay003" />
        </div>
      </div>
      <div className={css.bottomRow}>
        <div className={css.tallBox}></div>
        <div className={css.largeBox}>
          <TestFabric7 data={data} />
        </div>
      </div>
    </div>
  );
}

export default Layout;
