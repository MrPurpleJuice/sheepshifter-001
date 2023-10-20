import { useState, useEffect } from "react";
import "./App.css";
import TestFabric7 from "./Components/TestFabric7/TestFabric7";
import PythonService from "./Services/PythonService.jsx";

const fetchSegments = async ({ setData, setError }) => {
  try {
    const data = await PythonService.getSegments();
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
      <TestFabric7 data={data} />
      {error && <div>Error: {error.message}</div>}
    </>
  );
}

export default App;
