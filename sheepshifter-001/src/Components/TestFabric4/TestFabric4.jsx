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
    if (localData) {
      // Set canvas size to the original image size
      console.log(localData.image_width);
      console.log(`localData.image_width`, localData.image_width);
      canvas.setWidth(localData.image_width);
      canvas.setHeight(localData.image_height);
      canvas.renderAll(); // Re-render the canvas to apply new dimensions

      const backUrl = "src/assets/test-3-bg.png";

      // fabric.Image.fromURL(backUrl, function (img) {
      //   // Add background image
      //   canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      //     scaleX: canvas.width / img.width,
      //     scaleY: canvas.height / img.height,
      //   });
      // });
      // fabric.Image.fromURL(backUrl, function (oImg) {
      //   editor?.canvas.add(oImg);
      // });

      console.log(`localData.image_urls`, localData.image_urls);
      canvas.renderAll(); // Re-render the canvas to apply new dimensions
      // Here we add each image to the canvas
      for (let i = 0; i < localData.image_urls.length; i++) {
        let imageUrl = localData.image_urls[i];
        let placement = localData.placement_data[i];
        console.log(`placement`, placement);
        console.log(`imageUrl`, imageUrl);
        fabric.Image.fromURL(imageUrl, function (oImg) {
          editor?.canvas.add(oImg);
          oImg.set({
            left: placement.left,
            top: placement.top,
          });
        });
        // fabric.Image.fromURL(imageUrl, function (img) {
        //   // Set the image dimensions and placement
        //   img.set({
        //     left: placement.left,
        //     top: placement.top,
        //   });

        //   img.set({ id: "fabric-object-" + i });

        //   // Add image to the canvas
        //   canvas.add(img);
        // });
      }
      canvas.renderAll(); // Re-render the canvas to apply new dimensions
    }

    return () => {
      disposeFabric();
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default FabricExample;
