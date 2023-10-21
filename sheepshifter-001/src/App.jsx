import React, { useState, useEffect } from "react";
import PythonService from "./Services/PythonService.jsx";
import Layout from "./Components/Layout/Layout";

import config from "./Config/config.jsx";

import "./App.css";

const { defaultImageName, getApiNameFromImageName } = config;

const getBody = ({ apiName }) => {
  return JSON.stringify({
    search: { image: apiName },
  });
};

const fetchSegments = async ({ setData, setError, imageName }) => {
  try {
    const apiName = getApiNameFromImageName({ imageName });

    const body = getBody({ apiName });

    const data = await PythonService.getSegments({ body });

    setData({ ...data, localImageName: imageName });
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

  const onThumbnailClick = ({ imageName }) => {
    fetchSegments({ setData, setError, imageName });
  };

  const layoutProps = { data, onThumbnailClick };
  return (
    <>
      {error && <div>Error: {error.message}</div>}
      <Layout {...layoutProps} />
    </>
  );
}

export default App;
