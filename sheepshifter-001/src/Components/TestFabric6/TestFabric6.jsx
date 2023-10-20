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
  let draggedImg = "";
  var group = new fabric.Group();
  editor?.canvas.add(group);

  const handleEnd = (e) => {};
  // create a rect object
  const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  const img = document.createElement("img");
  img.src = deleteIcon;
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
    // tspoly.on({ drop: handleDrop });

    editor?.canvas.add(tspoly);
  };

  const onAddImage2 = () => {
    fabric.Image.fromURL(image, function (oImg) {
      editor?.canvas.add(oImg);
    });
  };

  const handleDrop = (e) => {
    console.log("handleDrop:", e);
    if (e.target && e.target.type == "polygon") {
      fabric.Image.fromURL(draggedImg, function (oImg) {
        console.log("handleDrop-oImg:", oImg);
        //oImg.scaleToWidth(100);
        let scaleX = e.target.width / oImg.width;
        let scaleY = e.target.height / oImg.height;
        //console.log(scale * 10);
        //oImg.scaleToWidth(scale * 10);\
        oImg.set("scaleX", scaleX);
        oImg.set("scaleY", scaleY);
        console.log(oImg);
        var patternSourceCanvas = new fabric.StaticCanvas();
        //console.log(oImg);
        patternSourceCanvas.add(oImg);
        patternSourceCanvas.renderAll();
        var pattern = new fabric.Pattern({
          source: patternSourceCanvas.getElement(),
          repeat: "repeat",
        });
        e.target.set("fill", pattern);
        editor?.canvas.remove(e.target);
        editor?.canvas.add(e.target);
      });
    }
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
