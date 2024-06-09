import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  getTemperature,
  getMoisture,
  getMovement,
  getTemperatureThreshold,
  getMoistureThreshold,
} from "../api";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [moistureData, setMoistureData] = useState([]);
  const [movementData, setMovementData] = useState([]);
  const [notifications, setNotifications] = useState({});

  const fetchTemperatureData = useCallback(async () => {
    try {
      const data = await getTemperature();
      setTemperatureData((prevData) => [
        ...prevData,
        { timestamp: data.timestamp.seconds * 1000, value: data.value },
      ]);
    } catch (error) {
      console.error("Error fetching temperature data:", error);
    }
  }, []);

  const fetchMoistureData = useCallback(async () => {
    try {
      const data = await getMoisture();
      setMoistureData((prevData) => [
        ...prevData,
        { timestamp: data.timestamp.seconds * 1000, value: data.value },
      ]);
    } catch (error) {
      console.error("Error fetching moisture data:", error);
    }
  }, []);

  const fetchMovementData = useCallback(async () => {
    try {
      const data = await getMovement();
      setMovementData((prevData) => [
        ...prevData,
        { timestamp: data.timestamp.seconds * 1000, value: data.value },
      ]);
    } catch (error) {
      console.error("Error fetching movement data:", error);
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const tempThreshold = await getTemperatureThreshold();
      const tempData = await getTemperature();
      const currentTemp = tempData.value;
      const tempStatus =
        currentTemp < tempThreshold.min || currentTemp > tempThreshold.max
          ? "out of range"
          : "correct range";

      const moistureThreshold = await getMoistureThreshold();
      const moistureData = await getMoisture();
      const currentMoisture = moistureData.value;
      const moistureStatus =
        currentMoisture < moistureThreshold.min ||
        currentMoisture > moistureThreshold.max
          ? "out of range"
          : "correct range";

      setNotifications({
        temperature: { value: currentTemp, status: tempStatus },
        moisture: { value: currentMoisture, status: moistureStatus },
        movement: { status: "N/A", action: "No action required" }, // Placeholder for movement
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

  const fetchAllData = useCallback(() => {
    fetchTemperatureData();
    fetchMoistureData();
    fetchMovementData();
    fetchNotifications();
  }, [
    fetchTemperatureData,
    fetchMoistureData,
    fetchMovementData,
    fetchNotifications,
  ]);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 10000);

    return () => clearInterval(interval);
  }, [fetchAllData]);

  return (
    <AppContext.Provider
      value={{
        temperatureData,
        moistureData,
        movementData,
        notifications,
        fetchTemperatureData,
        fetchMoistureData,
        fetchMovementData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
