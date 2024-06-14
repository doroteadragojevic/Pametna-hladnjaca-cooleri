import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  setMinTemperature,
  setMaxTemperature,
  setMinMoisture,
  setMaxMoisture,
  getTemperatureThreshold,
  getMoistureThreshold,
} from "../api";
import { Divider } from "../styles";

function Settings() {
  const { fetchTemperatureData, fetchMoistureData } = useContext(AppContext);

  const [minTemp, setMinTemp] = useState(0.0);
  const [maxTemp, setMaxTemp] = useState(100.0);
  const [minMoisture, setMinMoistureValue] = useState(0.0);
  const [maxMoisture, setMaxMoistureValue] = useState(100.0);

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
      alert("Humidity thresholds updated successfully!");
      fetchMoistureData();
    } catch (error) {
      console.error("Error updating humidity thresholds:", error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h3>Temperature Thresholds</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Min Temperature:
            <input
              type="number"
              value={minTemp}
              onChange={handleMinTempChange}
              style={{
                display: "block",
                margin: "5px 0",
                padding: "5px",
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Max Temperature:
            <input
              type="number"
              value={maxTemp}
              onChange={handleMaxTempChange}
              style={{
                display: "block",
                margin: "5px 0",
                padding: "5px",
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </label>
        </div>
        <button
          onClick={handleSaveTemperature}
          style={{
            display: "block",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            margin: "10px 0",
          }}
        >
          Save Temperature
        </button>
      </div>
      <Divider style={{ margin: "20px 0" }} />
      <div style={{ marginBottom: "20px" }}>
        <h3>Humidity Thresholds</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Min Humidity:
            <input
              type="number"
              value={minMoisture}
              onChange={handleMinMoistureChange}
              style={{
                display: "block",
                margin: "5px 0",
                padding: "5px",
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Max Humidity:
            <input
              type="number"
              value={maxMoisture}
              onChange={handleMaxMoistureChange}
              style={{
                display: "block",
                margin: "5px 0",
                padding: "5px",
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </label>
        </div>
        <button
          onClick={handleSaveMoisture}
          style={{
            display: "block",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            margin: "10px 0",
          }}
        >
          Save Humidity
        </button>
      </div>
    </div>
  );
}

export default Settings;
