import React from "react";

const Log = ({ log }) => {
  return (
    <div>
      <h2>Activity Log</h2>
      <ul>
        {log.map((entry, index) => (
          <li key={index}>
            {new Date(entry.timestamp).toLocaleString()}: {entry.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Log;
