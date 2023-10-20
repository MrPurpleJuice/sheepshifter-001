import { useState, useEffect } from "react";
import "./App.css";

import TestFabric7 from "./Components/TestFabric7/TestFabric7";

const fetchSegments = async ({ setData, setError }) => {
  fetch("http://127.0.0.1:8000/segment", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer: "http://localhost:5173",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: JSON.stringify({
      search: { image: "flowers" },
    }),
    method: "POST",
    mode: "cors",
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setData(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      setError(error);
    });
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
