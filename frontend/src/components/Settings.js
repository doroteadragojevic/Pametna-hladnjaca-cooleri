import React, { useState, useEffect, useContext } from "react";
import {
  setMinTemperature,
  setMaxTemperature,
  setMinMoisture,
  setMaxMoisture,
  getTemperatureThreshold,
  getMoistureThreshold,
} from "../api";
import { AppContext } from "../context/AppContext";

const Settings = () => {
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(100);
  const [minMoisture, setMinMoistureValue] = useState(0);
  const [maxMoisture, setMaxMoistureValue] = useState(100);
  const { fetchTemperatureData, fetchMoistureData } = useContext(AppContext);

  useEffect(() => {
    async function fetchThresholds() {
      try {
        const tempThreshold = await getTemperatureThreshold();
        setMinTemp(tempThreshold.min);
        setMaxTemp(tempThreshold.max);

        const moistureThreshold = await getMoistureThreshold();
        setMinMoistureValue(moistureThreshold.min);
        setMaxMoistureValue(moistureThreshold.max);
      } catch (error) {
        console.error("Error fetching thresholds:", error);
      }
    }
    fetchThresholds();
  }, []);

  const handleMinTempChange = (e) => setMinTemp(e.target.value);
  const handleMaxTempChange = (e) => setMaxTemp(e.target.value);
  const handleMinMoistureChange = (e) => setMinMoistureValue(e.target.value);
  const handleMaxMoistureChange = (e) => setMaxMoistureValue(e.target.value);

  const handleSaveTemperature = async () => {
    try {
      await setMinTemperature(minTemp);
      await setMaxTemperature(maxTemp);
      alert("Temperature thresholds updated successfully!");
      fetchTemperatureData();
    } catch (error) {
      console.error("Error updating temperature thresholds:", error);
    }
  };

  const handleSaveMoisture = async () => {
    try {
      await setMinMoisture(minMoisture);
      await setMaxMoisture(maxMoisture);
      alert("Moisture thresholds updated successfully!");
      fetchMoistureData();
    } catch (error) {
      console.error("Error updating moisture thresholds:", error);
    }
  };

  return (
    <div>
      <div>
        <h3>Temperature Thresholds</h3>
        <label>
          Min Temperature:
          <input type="number" value={minTemp} onChange={handleMinTempChange} />
        </label>
        <label>
          Max Temperature:
          <input type="number" value={maxTemp} onChange={handleMaxTempChange} />
        </label>
        <button onClick={handleSaveTemperature}>Save Temperature</button>
      </div>
      <div>
        <h3>Moisture Thresholds</h3>
        <label>
          Min Moisture:
          <input
            type="number"
            value={minMoisture}
            onChange={handleMinMoistureChange}
          />
        </label>
        <label>
          Max Moisture:
          <input
            type="number"
            value={maxMoisture}
            onChange={handleMaxMoistureChange}
          />
        </label>
        <button onClick={handleSaveMoisture}>Save Moisture</button>
      </div>
    </div>
  );
};

export default Settings;
