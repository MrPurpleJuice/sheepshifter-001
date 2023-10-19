import React, { useEffect } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric"; // this also installed on your project
import image from "./test-3-bg.png";

import "./styles.css";

export default function TestFabric() {
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    fabric.Image.fromURL(image, function (oImg) {
      editor?.canvas.add(oImg);
    });
  }, [fabric, editor]);

  return (
    <div className="App">
      <h1>FabricJS React Sample</h1>
      {/* <button onClick={onAddCircle}>Add circle</button> */}
      {/* <button onClick={onAddRectangle}>Add Rectangle</button> */}
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
