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
  const [activityLog, setActivityLog] = useState([]);

  const addLogEntry = (message) => {
    setActivityLog((prevLog) => [
      ...prevLog,
      { timestamp: new Date().getTime(), message },
    ]);
  };

  const fetchTemperatureData = useCallback(async () => {
    try {
      const data = await getTemperature();
      setTemperatureData((prevData) => [
        ...prevData.slice(-9),
        { timestamp: data.timestamp.seconds * 1000, value: data.value },
      ]);
      addLogEntry(`Received temperature information: ${data.value}°C.`);
    } catch (error) {
      console.error("Error fetching temperature data:", error);
    }
  }, []);

  const fetchMoistureData = useCallback(async () => {
    try {
      const data = await getMoisture();
      setMoistureData((prevData) => [
        ...prevData.slice(-9),
        { timestamp: data.timestamp.seconds * 1000, value: data.value },
      ]);
      addLogEntry(`Received moisture information: ${data.value}%.`);
    } catch (error) {
      console.error("Error fetching moisture data:", error);
    }
  }, []);

  const fetchMovementData = useCallback(async () => {
    try {
      const data = await getMovement();
      setMovementData((prevData) => [
        ...prevData.slice(-9),
        { timestamp: Date.now(), value: data.value },
      ]);
      addLogEntry(data.value ? "Movement detected." : "Movement not detected.");
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
          ? "is outside of the correct range"
          : "is inside the correct range";

      const moistureThreshold = await getMoistureThreshold();
      const moistureData = await getMoisture();
      const currentMoisture = moistureData.value;
      const moistureStatus =
        currentMoisture < moistureThreshold.min ||
        currentMoisture > moistureThreshold.max
          ? "is outside of the correct range"
          : "is inside the correct range";

      const movementData = await getMovement();
      const movementStatus = movementData.value
        ? "recognized - light currently turned on."
        : "not recognized - light currently turned off.";

      setNotifications({
        temperature: { value: currentTemp, status: tempStatus },
        moisture: { value: currentMoisture, status: moistureStatus },
        movement: { status: movementStatus },
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

  useEffect(() => {
    const temperatureInterval = setInterval(fetchTemperatureData, 10000);
    const moistureInterval = setInterval(fetchMoistureData, 10000);
    const movementInterval = setInterval(fetchMovementData, 10000);
    const notificationsInterval = setInterval(fetchNotifications, 10000);

    return () => {
      clearInterval(temperatureInterval);
      clearInterval(moistureInterval);
      clearInterval(movementInterval);
      clearInterval(notificationsInterval);
    };
  }, [
    fetchTemperatureData,
    fetchMoistureData,
    fetchMovementData,
    fetchNotifications,
  ]);

  return (
    <AppContext.Provider
      value={{
        temperatureData,
        moistureData,
        movementData,
        notifications,
        activityLog,
        fetchTemperatureData,
        fetchMoistureData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
