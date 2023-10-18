import React, { useEffect } from 'react';
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
matt is cool

<div class="btn-group">
  <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
</div>

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}


const MyComponent = () => {

  useEffect(() => {
    fetch("http://127.0.0.1:8000/", {
      headers: {
        "accept": "*/*",
        // ... other headers
      },
      referrer: "http://127.0.0.1:8000/",
      // ... other options
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);  // Empty dependency array means this useEffect runs once after component mount

  return <div>My React Component</div>;
};

export default MyComponent;
