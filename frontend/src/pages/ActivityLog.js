import React, { useState, useEffect } from "react";
import { getMovement } from "../api";

function ActivityLog() {
  const [movementData, setMovementData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMovement();
        setMovementData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching movement data:", error);
        setMovementData([]);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Activity Log</h1>
      {Array.isArray(movementData) && movementData.length > 0 ? (
        movementData.map((data, index) => (
          <div key={index}>
            <p>Movement: {data.movement}</p>
            <p>Time: {data.time}</p>
          </div>
        ))
      ) : (
        <p>No movement data available</p>
      )}
    </div>
  );
}

export default ActivityLog;
