import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  getTemperature,
  getHumidity,
  getMovement,
  getTemperatureThreshold,
  getHumidityThreshold,
} from "../api";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
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

  const fetchHumidityData = useCallback(async () => {
    try {
      const data = await getHumidity();
      setHumidityData((prevData) => [
        ...prevData.slice(-9),
        { timestamp: data.timestamp.seconds * 1000, value: data.value },
      ]);
      addLogEntry(`Received humidity information: ${data.value}%.`);
    } catch (error) {
      console.error("Error fetching humidity data:", error);
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

      const humidityThreshold = await getHumidityThreshold();
      const humidityData = await getHumidity();
      const currentHumidity = humidityData.value;
      const humidityStatus =
        currentHumidity < humidityThreshold.min ||
        currentHumidity > humidityThreshold.max
          ? "is outside of the correct range"
          : "is inside the correct range";

      const movementData = await getMovement();
      const movementStatus = movementData.value
        ? "recognized - light currently turned on."
        : "not recognized - light currently turned off.";

      setNotifications({
        temperature: { value: currentTemp, status: tempStatus },
        humidity: { value: currentHumidity, status: humidityStatus },
        movement: { status: movementStatus },
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

  useEffect(() => {
    const temperatureInterval = setInterval(fetchTemperatureData, 30000);
    const humidityInterval = setInterval(fetchHumidityData, 30000);
    const movementInterval = setInterval(fetchMovementData, 5000);
    const notificationsInterval = setInterval(fetchNotifications, 20000);

    return () => {
      clearInterval(temperatureInterval);
      clearInterval(humidityInterval);
      clearInterval(movementInterval);
      clearInterval(notificationsInterval);
    };
  }, [
    fetchTemperatureData,
    fetchHumidityData,
    fetchMovementData,
    fetchNotifications,
  ]);

  return (
    <AppContext.Provider
      value={{
        temperatureData,
        humidityData,
        movementData,
        notifications,
        activityLog,
        fetchTemperatureData,
        fetchHumidityData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
