import React, { useState, useEffect } from "react";
import Searched from "./Searched";

function App() {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch("/bacon")
      .then((res) => res.json())
      .then((data) => setBacon(data));
  }, []);

  return (
    <div>
      {/* {bacon ? bacon : `...where is my all my bacon?...`} */}
      <Searched />
    </div>
  );
}

export default App;
