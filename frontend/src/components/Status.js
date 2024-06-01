import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const StatusContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 20px;
`;

const Status = () => {
  const [temperature, setTemperature] = useState(null);
  const [moisture, setMoisture] = useState(null);
  const [movement, setMovement] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const tempRes = await axios.get("/api/temperature");
      const moistRes = await axios.get("/api/moisture");
      const moveRes = await axios.get("/api/movement");
      const errorRes = await axios.get("/api/error");

      setTemperature(tempRes.data.value);
      setMoisture(moistRes.data.value);
      setMovement(moveRes.data.value);
      setError(errorRes.data);
    };

    fetchData();
  }, []);

  return (
    <StatusContainer>
      <h3>Current Status</h3>
      <p>Temperature: {temperature}</p>
      <p>Moisture: {moisture}</p>
      <p>Movement: {movement ? "Detected" : "Not Detected"}</p>
      {error && (
        <div style={{ color: "red" }}>
          <p>
            Error: {error.value} at {error.timestamp}
          </p>
          <p>Started at: {error.errorStartTimestamp}</p>
        </div>
      )}
    </StatusContainer>
  );
};

export default Status;
