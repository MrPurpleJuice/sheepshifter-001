import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./styles.css";

export default function TestFabric({ data }) {
  const [localData, setLocalData] = useState(data);
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    setLocalData(data);
    // Any additional logic to handle data changes can go here
  }, [data]);

  const onAddCircle = () => {
    editor.addCircle();
  };

  const onAddRectangle = () => {
    editor.addRectangle();
  };

  return (
    <div className="App">
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
