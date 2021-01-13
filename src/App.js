import axios from "axios";
import React, { useEffect, useState } from "react";

const IconList = ({ title, path }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios(path).then((result) => {
      const parser = new DOMParser();
      let iconDoc = parser.parseFromString(result.data, "image/svg+xml");
      const err = iconDoc.querySelector("parsererror");
      if (err) {
        console.error("SVG failed to parse: ", path);
        return;
      }
      const body = document.body;
      const iconNode = iconDoc.querySelector("svg");
      if (iconNode) {
        body.appendChild(iconNode);
      }
      setData([...iconNode.querySelectorAll("symbol")].map((d) => d.id));
    });
  }, [path]);

  return (
    <div>
      <h2>
        {title} ({data.length})
      </h2>
      {data.map((id) => {
        return (
          <div className="icon" key={id}>
            <span className="icon-name">{id}</span>
            <svg key={id}>
              <use href={`#${id}`} />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

function App() {
  return (
    <IconList
      title="Orc Shared Icons"
      path={
        "https://raw.githubusercontent.com/Orckestra/orc-shared/develop/src/content/iconsSheet.svg"
      }
    />
  );
}

export default App;
