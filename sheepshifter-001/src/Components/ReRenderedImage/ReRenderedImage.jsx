import React, { useEffect, useState } from "react";
import css from "./styles.module.css";

import PythonService from "../../Services/PythonService.jsx";

const fetchReRenderedImage = async ({ body }) => {
  try {
    const data = await PythonService.getRotation({ body });
    console.log(`data`, data);
    return data;
  } catch (error) {}
};

export default function ReRenderedImage({ data }) {
  const [image, setImage] = useState(null);

  useEffect(() => {}, [data]);
  const body = JSON.stringify({ img: dataURL, obj: "taylor" });
  fetchReRenderedImage({ body });

  return (
    <div className={css.main}>
      {image && <img src={image} alt={"fileName"} />}
    </div>
  );
}
