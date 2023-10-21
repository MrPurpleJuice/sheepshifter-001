import React, { useState, useEffect } from "react";
import PythonService from "./Services/PythonService.jsx";
import Layout from "./Components/Layout/Layout";

import "./App.css";

let defaultImageName = "";
defaultImageName = "bladerunner";
defaultImageName = "taylor";
defaultImageName = "moon";

const getBody = ({ imageName }) => {
  return JSON.stringify({
    search: { image: imageName },
  });
};

const fetchSegments = async ({ setData, setError, imageName }) => {
  try {
    const body = getBody({ imageName });

    const data = await PythonService.getSegments({ body });
    setData(data);
  } catch (error) {
    setError(error);
  }
};

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSegments({ setData, setError, imageName: defaultImageName });
  }, []);

  const onThumbnailClick = ({ imageName }) => {};

  const layoutProps = { data, onThumbnailClick };
  return (
    <>
      {error && <div>Error: {error.message}</div>}
      <Layout {...layoutProps} />
    </>
  );
}

export default App;
