import React, { useState, useEffect } from "react";
import TestFabric7 from "../TestFabric7/TestFabric7";
import config from "../../Config/config";

import css from "./Layout.module.css";

const { rawImages, paths } = config;

function Layout({ data }) {
  const [images, setImages] = useState({});

  async function loadImages() {
    const loadedImages = {};

    for (const imageDef of rawImages) {
      const fileName = imageDef.fileName;
      const filePath = `${paths.rawImagesPath}${fileName}`;

      /* @vite-ignore */
      const module = await import(filePath);
      loadedImages[fileName] = module.default;
    }

    setImages(loadedImages);
  }

  useEffect(() => {
    loadImages();
  }, []);

  const renderedImages = rawImages.map((imageDef, index) => {
    const fileName = imageDef.fileName;
    return (
      <div key={fileName + index} className={css.box}>
        <img src={images[fileName]} alt={fileName} />
      </div>
    );
  });

  return (
    <div className={css.main}>
      <div className={css.topRow}>{renderedImages}</div>
      <div className={css.bottomRow}>
        <div className={css.tallBox}>
          <div className={css.messageText}>Segment Picker</div>
        </div>
        <div className={css.largeBox}>
          <TestFabric7 data={data} />
        </div>
      </div>
    </div>
  );
}

export default Layout;
