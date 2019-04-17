import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// hooks.js

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}

function App() {
  const [data, loading] = useFetch(
    "https://hn.algolia.com/api/v1/search?query=react"
  );
  return (
    <div className="App">
      {loading ? "loading" : data.hits.map(h => <div>{h.title}</div>)}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
