import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function ImageDisplay({ data }) {
  const baseUrl = 'http://127.0.0.1:8000/';
  return (
    <div>
      {data.image_urls.map((relativeUrl, index) => (
        <div key={relativeUrl} style={{ margin: '10px' }}>
          <img
            src={baseUrl + relativeUrl}
            alt={data.class_labels[index]}
            width={data.placement_data[index].left + "px"}
            height={data.placement_data[index].top + "px"}
          />
          <p>{data.class_labels[index]}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/", {
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      referrer: "http://localhost:5173",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify({
        search: {
          image: "flowers"
        }
      }),
      method: "POST",
      mode: "cors",
      credentials: "include"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setData(data);
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
      setError(error);
    });
  }, []);

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      {data && <ImageDisplay data={data} />}
    </>
  );
}

export default App;
