import axios from "axios";

const BASE_URL = "http://localhost:8080/iot";

export const getTemperature = async () => {
  const response = await axios.get(`${BASE_URL}/ls/temp`);
  return response.data;
};

export const getMoisture = async () => {
  const response = await axios.get(`${BASE_URL}/ls/humidity`);
  return response.data;
};

export const getMovement = async () => {
  const response = await axios.get(`${BASE_URL}/ls/motion`);
  return response.data;
};

export const getError = async (sensor) => {
  const response = await axios.get(`${BASE_URL}/error/${sensor}`);
  return response.data;
};

export const getTemperatureThreshold = async () => {
  const response = await axios.get(`${BASE_URL}/gv/temp`);
  return {
    min: response.data.min,
    max: response.data.max,
  };
};

export const getMoistureThreshold = async () => {
  const response = await axios.get(`${BASE_URL}/gv/humidity`);
  return {
    min: response.data.min,
    max: response.data.max,
  };
};

export const setMinTemperature = async (value) => {
  await axios.post(`${BASE_URL}/gv/temp`, { min: value });
};

export const setMaxTemperature = async (value) => {
  await axios.post(`${BASE_URL}/gv/temp`, { max: value });
};

export const setMinMoisture = async (value) => {
  await axios.post(`${BASE_URL}/gv/humidity`, { min: value });
};

export const setMaxMoisture = async (value) => {
  await axios.post(`${BASE_URL}/gv/humidity`, { max: value });
};
