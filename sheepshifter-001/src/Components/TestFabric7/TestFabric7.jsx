import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import css from "./styles.module.css";

import utils from "./utils.jsx";

const { testFunc, createRotationArrows } = utils;

console.log(`testFunc`, testFunc);
let firstRenderHappened = false;

const backgroundImgUrl = "static/test-3-bg.png";

export default function TestFabric({ data }) {
  const [localData, setLocalData] = useState(data);
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  if (localData && !firstRenderHappened) {
    console.log("rendering========================================>>>");
    const canvas = new fabric.Canvas("c");
    firstRenderHappened = true;

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "blue";
    fabric.Object.prototype.cornerStyle = "circle";

    createRotationArrows({ editor });

    // Set canvas size to the original image size
    editor?.canvas.setWidth(localData.image_width);
    editor?.canvas.setHeight(localData.image_height);

    fabric.Image.fromURL(backgroundImgUrl, function (img) {
      // Add background image
      editor?.canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: editor?.canvas.width / img.width,
        scaleY: editor?.canvas.height / img.height,
      });
    });

    // Here we add each image to the canvas
    for (let i = 0; i < localData.image_urls.length; i++) {
      let imageUrl = localData.image_urls[i];
      let placement = localData.placement_data[i];

      fabric.Image.fromURL(imageUrl, function (oImg) {
        oImg.set({
          left: placement.left,
          top: placement.top,
        });
        oImg.set({ id: "fabric-object-" + i });
        editor?.canvas.add(oImg);
      });
    }
  }

  return (
    <div className={css.main}>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
