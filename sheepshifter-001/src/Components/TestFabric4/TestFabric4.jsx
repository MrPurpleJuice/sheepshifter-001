import React, { useEffect, useState } from "react";
import { fabric } from "fabric";

const FabricExample = ({ data }) => {
  const fabricRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [localData, setLocalData] = useState(data);

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

      fabricRef.current.add(rect);
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
