import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./styles.css";

let dataSet = false;

export default function TestFabric({ data }) {
  const [localData, setLocalData] = useState(data);
  const { editor, onReady } = useFabricJSEditor();

  let canvas = null;
  useEffect(() => {
    setLocalData(data);
    // Any additional logic to handle data changes can go here
  }, [data]);

  if (localData && !dataSet) {
    console.log("rendering========================================>>>");
    canvas = new fabric.Canvas("c");
    dataSet = true;

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "blue";
    fabric.Object.prototype.cornerStyle = "circle";

    // Load SVG icons
    const arrows = {
      down: "/static/icons/down-arrow.svg",
      up: "/static/icons/up-arrow.svg",
      left: "/static/icons/left-arrow.svg",
      right: "/static/icons/right-arrow.svg",
    };

    // Initial view
    let currentView = "front";

    // Mapping of views
    let views = {
      top: "static/flowers/flowers-view--90-0-0-top.png",
      left: "static/flowers/flowers-view-0--90-0-left.png",
      right: "static/flowers/flowers-view-0-90-0-right.png",
      behind: "static/flowers/flowers-view-0-180-0-behind.png",
      bottom: "static/flowers/flowers-view-90-0-0-bottom.png",
      front: "static/rendered/masked_cropped_61661.png",
    };

    // Function to switch view
    function switchView(direction) {
      console.log(canvas.getActiveObject());

      // Logic to switch views based on the clicked arrow
      switch (direction.corner) {
        case "upArrow":
          currentView = "top";
          break;
        case "downArrow":
          currentView = "bottom";
          break;
        case "leftArrow":
          currentView = "left";
          break;
        case "rightArrow":
          currentView = "right";
          break;
        case "front":
          currentView = "front";
          break;
      }

      var left = canvas.getActiveObject().left;
      var top = canvas.getActiveObject().top;
      var angle = canvas.getActiveObject().angle;

      // Updating the view
      fabric.Image.fromURL(views[currentView], function (img) {
        img.set({ left: left, top: top, angle: angle });
        canvas.remove(canvas.getActiveObject());
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    }

    // Add arrows as controls
    for (let direction in arrows) {
      var img = document.createElement("img");
      img.src = arrows[direction];

      fabric.Object.prototype.controls[direction + "Arrow"] =
        new fabric.Control({
          x: direction === "right" ? 0.5 : direction === "left" ? -0.5 : 0,
          y: direction === "down" ? 0.5 : direction === "up" ? -0.5 : 0,
          offsetY: 16,
          offsetX: 16,
          cursorStyle: "pointer",
          mouseUpHandler: function (eventData, transform, direction) {
            switchView(direction);
          }.bind(this, direction),
          render: renderIcon(img),
          cornerSize: 24,
        });
    }

    function renderIcon(img) {
      return function (ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    }

    // Set canvas size to the original image size
    editor?.canvas.setWidth(localData.image_width);
    editor?.canvas.setHeight(localData.image_height);
    // canvas.renderAll(); // Re-render the canvas to apply new dimensions

    const backUrl = "src/assets/test-3-bg.png";

    fabric.Image.fromURL(backUrl, function (img) {
      // Add background image
      editor?.canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: editor?.canvas.width / img.width,
        scaleY: editor?.canvas.height / img.height,
      });
    });

    // Here we add each image to the canvas
    for (let i = 0; i < localData.image_urls.length; i++) {
      let imageUrl = localData.image_urls[i];
      let placement = localData.placement_data[i];

      fabric.Image.fromURL(imageUrl, function (oImg) {
        oImg.set({
          left: placement.left,
          top: placement.top,
        });
        oImg.set({ id: "fabric-object-" + i });
        editor?.canvas.add(oImg);
      });
    }
  }

  return (
    <div className="App">
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
