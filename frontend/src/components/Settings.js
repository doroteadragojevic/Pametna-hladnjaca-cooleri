import React, { useState } from "react";
import {
  setMinTemperature,
  setMaxTemperature,
  getTemperatureThreshold,
} from "../api";

function Settings() {
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(100);

  const handleMinTempChange = (e) => setMinTemp(e.target.value);
  const handleMaxTempChange = (e) => setMaxTemp(e.target.value);

  const handleSave = async () => {
    await setMinTemperature(minTemp);
    await setMaxTemperature(maxTemp);
    const updatedThreshold = await getTemperatureThreshold();
    console.log("Updated thresholds:", updatedThreshold);
  };

  return (
    <div>
      <h2>Settings</h2>
      <label>
        Min Temperature:
        <input type="number" value={minTemp} onChange={handleMinTempChange} />
      </label>
      <label>
        Max Temperature:
        <input type="number" value={maxTemp} onChange={handleMaxTempChange} />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Settings;
