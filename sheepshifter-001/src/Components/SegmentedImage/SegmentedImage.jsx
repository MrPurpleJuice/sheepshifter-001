import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Button from "react-bootstrap/Button";
import css from "./styles.module.css";

import utils from "./utils.jsx";

const { addBackgroundImg, createRotationArrows, addSegmentedImages } = utils;

import PythonService from "../../Services/PythonService.jsx";

const { getReRender } = PythonService;

const fetchRotation = async ({ body }) => {
  try {
    const data = await PythonService.getRotation({ body });
    console.log(`data`, data);
    return data;
  } catch (error) {}
};

const backgroundImgUrl = "static/testBackground002.jpg";
const canvasScalingFactor = 0.58;

// Use this to detect when the image has changed
let prevLocalImageName = "";

let canvas = null;
let imageName = null;
export default function SegmentedImage({ data }) {
  const [localData, setLocalData] = useState(data);
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
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
    canvas = editor.canvas;
    imageName = localData.imageName;

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

    createRotationArrows({ canvas, fetchRotation, imageName });
    addBackgroundImg({ canvas, backgroundImgUrl });
    addSegmentedImages({ canvas, localData });
  }

  const reRender = async ({ canvas, imageName }) => {
    var dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    const body = JSON.stringify({ img: dataURL, obj: imageName });
    // const body = JSON.stringify({ img: dataURL, obj: "taylor" });
    console.log("reRender");
    const data = await getReRender({ body });

    // Clearing the current canvas content
    canvas.clear().renderAll(); // Added renderAll() to ensure the canvas is cleared immediately

    fabric.Image.fromURL(data, function (img) {
      img.set({
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
      });
      canvas.add(img).renderAll(); // Added renderAll() to ensure the image is rendered immediately
    });
  };

  return (
    <div className={css.main}>
      <Button
        variant="outline-primary"
        onClick={() => reRender({ canvas, imageName })}
      >
        Render
      </Button>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
