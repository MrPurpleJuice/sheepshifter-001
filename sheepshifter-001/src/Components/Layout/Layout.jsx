import React, { useState, useEffect } from "react";
import TestFabric7 from "../TestFabric7/TestFabric7";
import css from "./Layout.module.css";

import config from "../../Config/config";

const { rawImages, paths } = config;

function Layout({ data }) {
  const [images, setImages] = useState({});

  useEffect(() => {
    async function loadImages() {
      const loadedImages = {};

      for (const imagePath of rawImages) {
        const filePath = `${paths.rawImagesPath}${imagePath}`;

        const module = await import(filePath);
        loadedImages[imagePath] = module.default;
      }

      setImages(loadedImages);
    }

    loadImages();
  }, []);

  const renderedImages = rawImages.map((imagePath, index) => (
    <div key={imagePath + index} className={css.box}>
      <img src={images[imagePath]} alt={imagePath} />
    </div>
  ));

  return (
    <div className={css.main}>
      <div className={css.topRow}>{renderedImages}</div>
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
