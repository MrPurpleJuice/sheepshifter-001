import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import css from "./styles.module.css";

import utils from "./utils.jsx";

const { addBackgroundImg, createRotationArrows, addSegmentedImages } = utils;

let firstRenderHappened = false;

const backgroundImgUrl = "static/test-4-bg.png";

const aspectRatio = 16 / 9;
const canvasScalingFactor = 1.1;
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

  console.log(`prevLocalImageName`, prevLocalImageName);
  console.log(`data?.localImageName`, data?.localImageName);
  console.log("---------->");

  const shouldRender =
    localData?.localImageName &&
    localData.localImageName !== prevLocalImageName;
  if (shouldRender) {
    prevLocalImageName = localData.localImageName;
    console.log("rendering========================================>>>");

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "blue";
    fabric.Object.prototype.cornerStyle = "circle";

    // Set canvas size to the original image size
    editor?.canvas.setWidth(localData.image_width * canvasScalingFactor);
    editor?.canvas.setHeight(localData.image_height * canvasScalingFactor);

    // Re-render the canvas to apply new dimensions (doesn't work)
    editor?.canvas.renderAll();

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
