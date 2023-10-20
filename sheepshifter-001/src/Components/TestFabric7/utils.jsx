const createRotationArrows = ({ editor }) => {
  // Load SVG icons
  const arrows = {
    //down: "/static/icons/down-arrow.svg",
    //up: "/static/icons/up-arrow.svg",
    left: "/static/icons/left-arrow.svg",
    right: "/static/icons/right-arrow.svg",
  };

  // Initial view
  let currentView = "front";

  // Temporary -- bad code -- sorry!
  const person_angle_views = ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png"]
  let currentObjAngle = 0;

  // Function to switch view
  function switchView(direction) {
    console.log(editor?.canvas.getActiveObject());

    if(direction.corner == "leftArrow") {
      currentObjAngle++;
    } else {
      currentObjAngle--;
    }

    let num_angles = person_angle_views.length;
    let next_view = "/static/rotation/bladerunner/person/" + person_angle_views[currentObjAngle%num_angles];

    var left = editor?.canvas.getActiveObject().left;
    var top = editor?.canvas.getActiveObject().top;
    var angle = editor?.canvas.getActiveObject().angle;

    // Updating the view
    fabric.Image.fromURL(next_view, function (img) {
      img.set({ left: left, top: top, angle: angle });
      editor?.canvas.remove(editor?.canvas.getActiveObject());
      editor?.canvas.add(img);
      editor?.canvas.setActiveObject(img);
      editor?.canvas.renderAll();
    });
  }

  // Add arrows as controls
  for (let direction in arrows) {
    var img = document.createElement("img");
    img.src = arrows[direction];

    fabric.Object.prototype.controls[direction + "Arrow"] = new fabric.Control({
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
};

const addBackgroundImg = ({ editor, backgroundImgUrl }) => {
  fabric.Image.fromURL(backgroundImgUrl, function (img) {
    editor?.canvas.setBackgroundImage(
      img,
      editor?.canvas.renderAll.bind(editor?.canvas),
      {
        scaleX: editor?.canvas.width / img.width,
        scaleY: editor?.canvas.height / img.height,
      }
    );
  });
};

const addSegmentedImages = ({ editor, localData }) => {
  // Here we add each image to the canvas
  for (let i = 0; i < localData.image_urls.length; i++) {
    let imageUrl = localData.image_urls[i];
    let placement = localData.placement_data[i];

    fabric.Image.fromURL(imageUrl, function (oImg) {
      oImg.set({
        left: placement.left,
        top: placement.top,
      });
      oImg.set({ id: localData.class_labels[i]});
      editor?.canvas.add(oImg);
    });
  }
};

export default { createRotationArrows, addBackgroundImg, addSegmentedImages };
