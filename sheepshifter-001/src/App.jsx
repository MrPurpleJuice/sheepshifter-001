import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
          referrer: "http://localhost:5173",  // Update the referrer to your React app's origin
          referrerPolicy: "strict-origin-when-cross-origin",
          body: JSON.stringify({
            search: {
              image: "static/test-2.jpg"
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
        })
        .catch(error => {
          console.error("There was a problem with the fetch operation:", error);
        });
          

      }, []);
  
      // return (
      //     <div>
      //         {error && <div>Error: {error.message}</div>}
      //         {data && <div>Data: {JSON.stringify(data)}</div>}
      //     </div>
      // );
  // }
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
