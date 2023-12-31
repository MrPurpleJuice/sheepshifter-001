import React, { useState, useEffect } from "react";
import PythonService from "./Services/PythonService.jsx";
import Layout from "./Components/Layout/Layout";

import config from "./Config/config.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
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
    console.log(`data`, data);
    setData({ ...data, localImageName: imageName });
  } catch (error) {
    setError(error);
  }
};

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [imageName, setImageName] = useState('bladeRunner');

  useEffect(() => {
    fetchSegments({ setData, setError, imageName: defaultImageName });
  }, []);

  const onThumbnailClick = ({ imageName }) => {
    fetchSegments({ setData, setError, imageName });
    console.log(imageName)
    setImageName(imageName);
  };
  

  const layoutProps = { data, onThumbnailClick, imageName };
  return (
    <>
      {error && <div>Error: {error.message}</div>}
      <div className={"navBar"}>ArtBot</div> {/* Add this line */}
      <Layout {...layoutProps} />
    </>
  );
}

export default App;
