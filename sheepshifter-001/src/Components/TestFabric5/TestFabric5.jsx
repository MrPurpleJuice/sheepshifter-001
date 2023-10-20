import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import image from "./test-3-bg.png";

const FabricExample = ({ data }) => {
  const fabricRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [localData, setLocalData] = useState(data);

  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    const initFabric = () => {
      fabricRef.current = new fabric.Canvas(canvasRef.current);
    };

    const addRectangle = () => {
      const rect = new fabric.Rect({
        top: 50,
        left: 50,
        width: 50,
        height: 50,
        fill: "red",
      });

      const rect2 = new fabric.Rect({
        top: 60,
        left: 60,
        width: 50,
        height: 50,
        fill: "green",
      });

      fabric.Image.fromURL(image, function (oImg) {
        editor?.canvas.add(oImg);
        oImg.set({
          left: 20,
          top: 20,
        });
      });

      fabricRef.current.add(rect);
      fabricRef.current.add(rect2);
    };

    const disposeFabric = () => {
      fabricRef.current.dispose();
    };

    initFabric();
    addRectangle();

    console.log(`localData222-------------------`, localData);

    return () => {
      disposeFabric();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default FabricExample;
