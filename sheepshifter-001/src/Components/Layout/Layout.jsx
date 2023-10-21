import React, { useState, useEffect } from "react";
import SegmentedImage from "../SegmentedImage/SegmentedImage";
import config from "../../Config/config";

import css from "./Layout.module.css";

const { rawImages, paths } = config;

function Layout({ data, onThumbnailClick, imageName }) {
  const [images, setImages] = useState({});
  const [layers, setLayers] = useState([]);

  async function loadImages() {
    const loadedImages = {};

    for (const imageDef of rawImages) {
      const { fileName } = imageDef;
      const filePath = `${paths.rawImagesPath}${fileName}`;

      /* @vite-ignore */
      const module = await import(filePath);
      loadedImages[fileName] = module.default;
    }

    setImages(loadedImages);
  }

  useEffect(() => {
    loadImages();
    updateLayers();
  }, [imageName]);

  const updateLayers = () => {
    switch (imageName) {
      case 'bladeRunner':
        setLayers(['Car', 'Tree', 'Man']);
        break;
      case 'moon':
        setLayers(['Flagpole', 'Flag', 'Astronaut']);
        break;
      case 'taylor':
        setLayers(['1989', 'Bird', 'Bird', 'Taylor']);
        break;
      default:
        setLayers([]);
    }
  };

  const renderedImages = rawImages.map((imageDef, index) => {
    const { fileName, imageName } = imageDef;

    const onClick = () => onThumbnailClick({ imageName });

    return (
      <div key={fileName + index} className={css.box} onClick={onClick}>
        <img src={images[fileName]} alt={fileName} />
      </div>
    );
  });

  return (
    <div className={css.main}>
      <div className={css.topRow}>{renderedImages}</div>
      <div className={css.bottomRow}>
        <div className={css.tallBox}>
          <div className={css.messageText}>Elements</div>

          <ul>
            {layers.map((layer, index) => (
              <li key={index}>{layer}</li>
            ))}
          </ul>
        </div>
        <div className={css.largeBox}>
          <SegmentedImage data={data} />
        </div>
      </div>
    </div>
  );
}

export default Layout;
