import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SettingsContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 20px;
`;

const Settings = () => {
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minMoist, setMinMoist] = useState("");
  const [maxMoist, setMaxMoist] = useState("");

  const handleSave = async () => {
    await axios.post("/api/minTemperature", { value: minTemp });
    await axios.post("/api/maxTemperature", { value: maxTemp });
    await axios.post("/api/minMoisture", { value: minMoist });
    await axios.post("/api/maxMoisture", { value: maxMoist });
    alert("Settings saved!");
  };

  return (
    <SettingsContainer>
      <h3>Settings</h3>
      <label>
        Min Temperature:
        <input
          type="number"
          value={minTemp}
          onChange={(e) => setMinTemp(e.target.value)}
        />
      </label>
      <br />
      <label>
        Max Temperature:
        <input
          type="number"
          value={maxTemp}
          onChange={(e) => setMaxTemp(e.target.value)}
        />
      </label>
      <br />
      <label>
        Min Moisture:
        <input
          type="number"
          value={minMoist}
          onChange={(e) => setMinMoist(e.target.value)}
        />
      </label>
      <br />
      <label>
        Max Moisture:
        <input
          type="number"
          value={maxMoist}
          onChange={(e) => setMaxMoist(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
    </SettingsContainer>
  );
};

export default Settings;
