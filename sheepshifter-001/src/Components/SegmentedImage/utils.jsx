import config from "../../Config/config";

const urls = config.urls;
const { pythonServerUrl, reactUrl } = urls;
const url = `${pythonServerUrl}rotation`;

// Function to switch view
function switchView({ direction, canvas, fetchRotation }) {
  let next_view;
  const id = canvas.getActiveObject().id;
  console.log(`id`, id);

  const body = JSON.stringify({
    img: "bladerunner",
    obj: canvas.getActiveObject().id,
    pos: 0,
    dir: direction["corner"],
  });

  console.log(`body`, body);
  fetchRotation({ body });
  return;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      img: "bladerunner",
      obj: canvas.getActiveObject().id,
      pos: 0,
      dir: direction["corner"],
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Process the response here
      next_view = data.nextView;
      var left = canvas.getActiveObject().left;
      var top = canvas.getActiveObject().top;
      var angle = canvas.getActiveObject().angle;

      // Updating the view
      fabric.Image.fromURL(next_view, function (img) {
        img.set({ left: left, top: top, angle: angle });
        canvas.remove(canvas.getActiveObject());
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const createRotationArrows = ({ canvas, fetchRotation }) => {
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
  const person_angle_views = [
    "0.png",
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
  ];
  let currentObjAngle = 0;

  // // Function to switch view
  // function switchView(direction) {
  //   // console.log(canvas.getActiveObject());

  //   if (direction.corner == "leftArrow") {
  //     currentObjAngle++;
  //   } else {
  //     currentObjAngle--;
  //   }

  //   let num_angles = person_angle_views.length;
  //   let next_view =
  //     "/static/rotation/bladerunner/person/" +
  //     person_angle_views[currentObjAngle % num_angles];

  //   var left = canvas.getActiveObject().left;
  //   var top = canvas.getActiveObject().top;
  //   var angle = canvas.getActiveObject().angle;

  //   // Updating the view
  //   fabric.Image.fromURL(next_view, function (img) {
  //     img.set({ left: left, top: top, angle: angle });
  //     canvas.remove(canvas.getActiveObject());
  //     canvas.add(img);
  //     canvas.setActiveObject(img);
  //     canvas.renderAll();
  //   });
  // }

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
        switchView({ direction, canvas, fetchRotation });
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

const addBackgroundImg = ({ canvas, backgroundImgUrl }) => {
  fabric.Image.fromURL(backgroundImgUrl, function (img) {
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      // To what are these scaling factors applied?
      scaleX: canvas.width / img.width,
      scaleY: canvas.height / img.height,
    });
  });
};

const addSegmentedImages = ({ canvas, localData }) => {
  // Here we add each image to the canvas
  for (let i = 0; i < localData.image_urls.length; i++) {
    let imageUrl = localData.image_urls[i];
    let placement = localData.placement_data[i];

    fabric.Image.fromURL(imageUrl, function (oImg) {
      oImg.set({
        left: placement.left,
        top: placement.top,
      });
      oImg.set({ id: localData.class_labels[i] });
      canvas.add(oImg);
    });
  }
};

export default { createRotationArrows, addBackgroundImg, addSegmentedImages };
