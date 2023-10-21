import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import css from "./styles.module.css";

import utils from "./utils.jsx";

const { addBackgroundImg, createRotationArrows, addSegmentedImages } = utils;

const backgroundImgUrl = "static/test-4-bg.png";

const aspectRatio = 16 / 9;
const canvasScalingFactor = 1;
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

  if (shouldRender) {
    console.log("rendering========================================>>>");
    prevLocalImageName = localData.localImageName;
    const { canvas } = editor;
    canvas.clear();
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "blue";
    fabric.Object.prototype.cornerStyle = "circle";

    // Set canvas size to the original image size
    canvas.setWidth(localData.image_width * canvasScalingFactor);
    canvas.setHeight(localData.image_height * canvasScalingFactor);

    // Re-render the canvas to apply new dimensions (doesn't work)
    canvas.renderAll();

    createRotationArrows({ editor });
    addBackgroundImg({ editor, backgroundImgUrl });
    addSegmentedImages({ editor, localData });
  }

  return (
    <div className={css.main}>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
