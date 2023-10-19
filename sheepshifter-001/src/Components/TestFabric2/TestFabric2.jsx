import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./styles.css";

// import back from "../../assets/test-3-bg.png";

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
    // // DOM functionality

    //         console.log(data);  // Process the response here

    // Set canvas size to the original image size
    console.log(localData.image_width);

    // canvas.setWidth(2000);
    canvas.setWidth(data.image_width);
    canvas.setHeight(data.image_height);
    canvas.renderAll(); // Re-render the canvas to apply new dimensions

    const backUrl = "http://localhost:5173/src/assets/test-3-bg.png";

    fabric.Image.fromURL(backUrl, function (img) {
      // fabric.Image.fromURL(data.background, function (img) {
      // Add background image
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
      });
    });
    console.log(`data.image_urls`, data.image_urls);
    // // Here we add each image to the canvas
    // for (let i = 0; i < data.image_urls.length; i++) {
    //     let imageUrl = data.image_urls[i];
    //     let placement = data.placement_data[i];

    //     fabric.Image.fromURL(imageUrl, function (img) {
    //         // Set the image dimensions and placement
    //         img.set({
    //             left: placement.left,
    //             top: placement.top
    //         });

    //         img.set({id: 'fabric-object-' + i});

    //         // Add image to the canvas
    //         canvas.add(img);
    //     });
  }

  return (
    <div className="App">
      <button onClick={onAddCircle}>Add circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
