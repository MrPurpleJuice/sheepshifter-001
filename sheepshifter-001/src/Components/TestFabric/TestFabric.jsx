import React from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./styles.css";

export default function TestFabric() {
  const { editor, onReady } = useFabricJSEditor();
  const onAddCircle = () => {
    editor.addCircle();
  };
  const onAddRectangle = () => {
    editor.addRectangle();
  };

  return (
    <div className="App">
      <h1>FabricJS React Sample</h1>
    </div>
  );
  //   return (
  //     <div className="App">
  //       <h1>FabricJS React Sample</h1>
  //       <button onClick={onAddCircle}>Add circle</button>
  //       <button onClick={onAddRectangle}>Add Rectangle</button>
  //       <FabricJSCanvas className="sample-canvas" onReady={onReady} />
  //     </div>
  //   );
}
