import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import css from "./styles.module.css";

import utils from "./utils.jsx";

const { addBackgroundImg, createRotationArrows, addSegmentedImages } = utils;

import PythonService from "../../Services/PythonService.jsx";

const fetchRotation = async ({ body }) => {
  try {
    const data = await PythonService.getRotation({ body });
    console.log(`data`, data);
  } catch (error) {}
};

const backgroundImgUrl = "static/testBackground002.jpg";
// const canvasScalingFactor = 0.4;
// const canvasScalingFactor = 0.46;
const canvasScalingFactor = 0.58;

// Use this to detect when the image has changed
let prevLocalImageName = "";

export default function SegmentedImage({ data }) {
  const [localData, setLocalData] = useState(data);
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    // console.log(`data`, data);
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
    // fetchRotation();
    console.log("rendering========================================>>>");
    prevLocalImageName = localData.localImageName;
    const { canvas } = editor;
    canvas.clear();
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "blue";
    fabric.Object.prototype.cornerStyle = "circle";

    // Set canvas size to the original image size
    canvas.setWidth(1920 * canvasScalingFactor * 1.1);
    canvas.setHeight(1080 * canvasScalingFactor * 1.1);

    // Re-render the canvas to apply new dimensions
    canvas.renderAll();

    const backgroundImgUrl = localData.background;

    createRotationArrows({ canvas, fetchRotation });
    addBackgroundImg({ canvas, backgroundImgUrl });
    addSegmentedImages({ canvas, localData });
  }

  return (
    <div className={css.main}>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
