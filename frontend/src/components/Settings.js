import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  setMinTemperature,
  setMaxTemperature,
  setMinHumidity,
  setMaxHumidity,
  getTemperatureThreshold,
  getHumidityThreshold,
} from "../api";
import { Divider } from "../styles";

function Settings() {
  const { fetchTemperatureData, fetchHumidityData } = useContext(AppContext);

  const [minTemp, setMinTemp] = useState(0.0);
  const [maxTemp, setMaxTemp] = useState(100.0);
  const [minHumidity, setMinHumidityValue] = useState(0.0);
  const [maxHumidity, setMaxHumidityValue] = useState(100.0);

  useEffect(() => {
    async function fetchThresholds() {
      try {
        const tempThreshold = await getTemperatureThreshold();
        setMinTemp(tempThreshold.min);
        setMaxTemp(tempThreshold.max);

        const HumidityThreshold = await getHumidityThreshold();
        setMinHumidityValue(HumidityThreshold.min);
        setMaxHumidityValue(HumidityThreshold.max);
      } catch (error) {
        console.error("Error fetching thresholds:", error);
      }
    }
    fetchThresholds();
  }, []);

  const handleMinTempChange = (e) => setMinTemp(e.target.value);
  const handleMaxTempChange = (e) => setMaxTemp(e.target.value);
  const handleMinHumidityChange = (e) => setMinHumidityValue(e.target.value);
  const handleMaxHumidityChange = (e) => setMaxHumidityValue(e.target.value);

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

  const handleSaveHumidity = async () => {
    try {
      await setMinHumidity(minHumidity);
      await setMaxHumidity(maxHumidity);
      alert("Humidity thresholds updated successfully!");
      fetchHumidityData();
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
              value={minHumidity}
              onChange={handleMinHumidityChange}
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
              value={maxHumidity}
              onChange={handleMaxHumidityChange}
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
          onClick={handleSaveHumidity}
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
