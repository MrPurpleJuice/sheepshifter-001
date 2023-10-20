import * as React from "react";
import { useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import tshirt from "./assets/tshirt.json";
import "./style.css";

import image from "./test-3-bg.png";

const App = () => {
  const { tpoly } = tshirt;
  const { selectedObjects, editor, onReady } = useFabricJSEditor();

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = "blue";
  fabric.Object.prototype.cornerStyle = "circle";

  const onAddImage = () => {
    console.log("tpoly:", tpoly);
    var tspoly = new fabric.Polygon(tpoly, {
      left: 37,
      top: 140,
      angle: 0,
      fill: "white",
      objectCaching: false,
    });

    editor?.canvas.add(tspoly);
  };

  const onAddImage2 = () => {
    fabric.Image.fromURL(image, function (oImg) {
      editor?.canvas.add(oImg);
    });
  };

  return (
    <div>
      <div>
        <button onClick={onAddImage}>Add Image</button>
        <button onClick={onAddImage2}>Add Image2</button>
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
        <canvas id="canvas" width="300" height="300"></canvas>
      </div>
    </div>
  );
};
export default App;
