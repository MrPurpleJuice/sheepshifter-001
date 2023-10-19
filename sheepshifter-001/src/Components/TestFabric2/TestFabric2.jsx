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
  console.log({ localData });

  const canvas = new fabric.Canvas("c");

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
      console.log(`imageUrl`, imageUrl);
      fabric.Image.fromURL(imageUrl, function (oImg) {
        editor?.canvas.add(oImg);
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

  return (
    <div className="App">
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
