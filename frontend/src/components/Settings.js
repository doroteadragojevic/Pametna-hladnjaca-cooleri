import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const SettingsContainer = styled.div`
  padding: 20px;
  margin-top: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SettingField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Settings = () => {
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minMoist, setMinMoist] = useState("");
  const [maxMoist, setMaxMoist] = useState("");

  useEffect(() => {
    // Fetch current threshold values from the backend
    const fetchThresholds = async () => {
      try {
        const tempRes = await axios.get("/api/thresholds/temperature");
        setMinTemp(tempRes.data.min);
        setMaxTemp(tempRes.data.max);

        const moistRes = await axios.get("/api/thresholds/moisture");
        setMinMoist(moistRes.data.min);
        setMaxMoist(moistRes.data.max);
      } catch (error) {
        console.error("Failed to fetch threshold values:", error);
      }
    };
    fetchThresholds();
  }, []);

  const handleSaveTemperature = async () => {
    try {
      await axios.post("/api/thresholds/temperature", {
        min: minTemp,
        max: maxTemp,
      });
      alert("Temperature thresholds updated successfully!");
    } catch (error) {
      console.error("Failed to save temperature thresholds:", error);
    }
  };

  const handleSaveMoisture = async () => {
    try {
      await axios.post("/api/thresholds/moisture", {
        min: minMoist,
        max: maxMoist,
      });
      alert("Moisture thresholds updated successfully!");
    } catch (error) {
      console.error("Failed to save moisture thresholds:", error);
    }
  };

  return (
    <SettingsContainer>
      <h2>Settings</h2>
      <SettingField>
        <Label>Min Temperature:</Label>
        <Input
          type="number"
          value={minTemp}
          onChange={(e) => setMinTemp(e.target.value)}
        />
      </SettingField>
      <SettingField>
        <Label>Max Temperature:</Label>
        <Input
          type="number"
          value={maxTemp}
          onChange={(e) => setMaxTemp(e.target.value)}
        />
      </SettingField>
      <Button onClick={handleSaveTemperature}>
        Save Temperature Thresholds
      </Button>
      <SettingField>
        <Label>Min Moisture:</Label>
        <Input
          type="number"
          value={minMoist}
          onChange={(e) => setMinMoist(e.target.value)}
        />
      </SettingField>
      <SettingField>
        <Label>Max Moisture:</Label>
        <Input
          type="number"
          value={maxMoist}
          onChange={(e) => setMaxMoist(e.target.value)}
        />
      </SettingField>
      <Button onClick={handleSaveMoisture}>Save Moisture Thresholds</Button>
    </SettingsContainer>
  );
};

export default Settings;
