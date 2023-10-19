import React, { useEffect } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./styles.css";

import { fabric } from "fabric"; // this also installed on your project
// import { useFabricJSEditor } from "fabricjs-react";

import image from "./test-3-bg.png";

export default function TestFabric() {
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    fabric.Image.fromURL(image, function (oImg) {
      editor?.canvas.add(oImg);
    });
  }, [fabric, editor]);

  // const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const onAddCircle = () => {
    editor.addCircle();
  };
  const onAddRectangle = () => {
    editor.addRectangle();
  };

  return (
    <div className="App">
      <h1>FabricJS React Sample</h1>
      {/* <button onClick={onAddCircle}>Add circle</button> */}
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
