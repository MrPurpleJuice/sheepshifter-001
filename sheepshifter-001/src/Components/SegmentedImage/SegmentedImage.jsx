import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import css from "./styles.module.css";

import utils from "./utils.jsx";

const { addBackgroundImg, createRotationArrows, addSegmentedImages } = utils;

const backgroundImgUrl = "static/testBackground002.jpg";
const canvasScalingFactor = 0.63;

// Use this to detect when the image has changed
let prevLocalImageName = "";

export default function TestFabric({ data }) {
  const [localData, setLocalData] = useState(data);
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    console.log(`data`, data);
    if (data?.localImageName) {
      setLocalData(data);
    }
  }, [data]);

  const shouldRender =
    editor &&
    localData?.localImageName &&
    localData.localImageName !== prevLocalImageName;

  // Only allow the page to render when the image chagnes
  if (shouldRender) {
    console.log("rendering========================================>>>");
    prevLocalImageName = localData.localImageName;
    const { canvas } = editor;
    canvas.clear();
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "blue";
    fabric.Object.prototype.cornerStyle = "circle";

    // Set canvas size to the original image size
    canvas.setWidth(1920 * canvasScalingFactor);
    canvas.setHeight(1080 * canvasScalingFactor);

    console.log(`canvas.width `, canvas.width);

    // Re-render the canvas to apply new dimensions
    canvas.renderAll();

    const backgroundImgUrl = localData.background;

    createRotationArrows({ canvas });
    addBackgroundImg({ canvas, backgroundImgUrl });
    addSegmentedImages({ canvas, localData });
  }

  return (
    <div className={css.main}>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
