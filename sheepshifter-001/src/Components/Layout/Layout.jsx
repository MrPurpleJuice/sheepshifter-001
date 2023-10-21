import React, { useState, useEffect } from "react";
import SegmentedImage from "../SegmentedImage/SegmentedImage";
import config from "../../Config/config";

// import Button from "react-bootstrap/Button";
import css from "./Layout.module.css";
// import ReRenderedImage from "../ReRenderedImage/ReRenderedImage";

const { rawImages, paths } = config;

function Layout({ data, onThumbnailClick }) {
  const [images, setImages] = useState({});
  const [showRerender, setShowRerender] = useState(false);

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
  }, []);

  const renderedImages = rawImages.map((imageDef, index) => {
    const { fileName, imageName } = imageDef;

    const onClick = () => onThumbnailClick({ imageName });

    return (
      <div key={fileName + index} className={css.box} onClick={onClick}>
        <img src={images[fileName]} alt={fileName} />
      </div>
    );
  });
  const reRender = () => {
    console.log("reRender");
    setShowRerender(true);
  };

  return (
    <div className={css.main}>
      {/* <Button variant="outline-primary" onClick={reRender}>
        Render
      </Button> */}
      <div className={css.topRow}>{renderedImages}</div>
      <div className={css.bottomRow}>
        <div className={css.tallBox}>
          <div className={css.messageText}>Segment Picker</div>
        </div>
        <div className={css.largeBox}>
          {/* {true && <ReRenderedImage data={data} />} */}
          {/* {showRerender && <ReRenderedImage data={data} />} */}
          {true && <SegmentedImage data={data} />}
        </div>
      </div>
    </div>
  );
}

export default Layout;
