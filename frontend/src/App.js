// src/App.js
import React, { useState, useEffect } from "react";
import TemperatureChart from "./components/TemperatureChart";
import MoistureChart from "./components/MoistureChart";
import {
  mockTemperatureData,
  mockMoistureData,
  mockThresholdData,
  mockActivityLog,
} from "./mockData";
import {
  Container,
  Title,
  Dashboard,
  Section,
  SectionTitle,
  ThresholdInputs,
  Input,
  Button,
  ActivityLog,
  LogItem,
  LogList,
} from "./styles";

const App = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [moistureData, setMoistureData] = useState([]);
  const [minTemperature, setMinTemperature] = useState(
    mockThresholdData.minTemperature
  );
  const [maxTemperature, setMaxTemperature] = useState(
    mockThresholdData.maxTemperature
  );
  const [minMoisture, setMinMoisture] = useState(mockThresholdData.minMoisture);
  const [maxMoisture, setMaxMoisture] = useState(mockThresholdData.maxMoisture);
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setTemperatureData(mockTemperatureData);
      setMoistureData(mockMoistureData);
      setActivityLog(mockActivityLog);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleThresholdUpdate = async () => {
    console.log("Setting minTemperature:", minTemperature);
    console.log("Setting maxTemperature:", maxTemperature);
    console.log("Setting minMoisture:", minMoisture);
    console.log("Setting maxMoisture:", maxMoisture);
    alert("Threshold values updated successfully.");
  };

  return (
    <Container>
      <Title>Pametna Hladnjača</Title>
      <Dashboard>
        <Section>
          <SectionTitle>Temperature</SectionTitle>
          <TemperatureChart temperatureData={temperatureData} />
          <ThresholdInputs>
            <span>Min Temperature: </span>
            <Input
              type="number"
              value={minTemperature}
              onChange={(e) => setMinTemperature(parseFloat(e.target.value))}
            />
            <span>Max Temperature: </span>
            <Input
              type="number"
              value={maxTemperature}
              onChange={(e) => setMaxTemperature(parseFloat(e.target.value))}
            />
          </ThresholdInputs>
        </Section>
        <Section>
          <SectionTitle>Moisture</SectionTitle>
          <MoistureChart moistureData={moistureData} />
          <ThresholdInputs>
            <span>Min Moisture: </span>
            <Input
              type="number"
              value={minMoisture}
              onChange={(e) => setMinMoisture(parseFloat(e.target.value))}
            />
            <span>Max Moisture: </span>
            <Input
              type="number"
              value={maxMoisture}
              onChange={(e) => setMaxMoisture(parseFloat(e.target.value))}
            />
          </ThresholdInputs>
        </Section>
        <Button onClick={handleThresholdUpdate}>Update Threshold Values</Button>
      </Dashboard>
      <ActivityLog>
        <SectionTitle>Activity Log</SectionTitle>
        <LogList>
          {activityLog.map((log, index) => (
            <LogItem key={index}>{`${new Date(
              log.timestamp
            ).toLocaleString()}: ${log.message}`}</LogItem>
          ))}
        </LogList>
      </ActivityLog>
    </Container>
  );
};

export default App;
