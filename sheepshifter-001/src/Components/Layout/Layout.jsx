import React from "react";
import TestFabric7 from "../TestFabric7/TestFabric7";
import css from "./Layout.module.css";

function Layout({ data }) {
  return (
    <div className={css.main}>
      <div className={css.topRow}>
        <div className={css.box}></div>
        <div className={css.box}></div>
        <div className={css.box}></div>
        <div className={css.box}></div>
        <div className={css.box}></div>
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
