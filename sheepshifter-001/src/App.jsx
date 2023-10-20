import React, { useState, useEffect } from "react";
import PythonService from "./Services/PythonService.jsx";
import Layout from "./Components/Layout/Layout";

import "./App.css";

const body = JSON.stringify({
  search: { image: "bladerunner" },
});

const fetchSegments = async ({ setData, setError }) => {
  try {
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
    fetchSegments({ setData, setError });
  }, []);

  return (
    <>
      <Layout data={data} />
      {error && <div>Error: {error.message}</div>}
    </>
  );
}

export default App;
