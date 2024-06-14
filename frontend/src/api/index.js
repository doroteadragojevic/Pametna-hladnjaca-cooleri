import axios from "axios";

const BASE_URL = "http://localhost:8080/iot";

export const getTemperature = async () => {
  const response = await axios.get(`${BASE_URL}/ls/temp`);
  return response.data;
};

export const getHumidity = async () => {
  const response = await axios.get(`${BASE_URL}/ls/humidity`);
  return response.data;
};

export const getMovement = async () => {
  const response = await axios.get(`${BASE_URL}/ls/motion`);
  return response.data;
};

export const getTemperatureThreshold = async () => {
  const minResponse = await axios.get(`${BASE_URL}/gv/temp/min`);
  const maxResponse = await axios.get(`${BASE_URL}/gv/temp/max`);
  return {
    min: minResponse.data.value,
    max: maxResponse.data.value,
  };
};

export const getHumidityThreshold = async () => {
  const minResponse = await axios.get(`${BASE_URL}/gv/humidity/min`);
  const maxResponse = await axios.get(`${BASE_URL}/gv/humidity/max`);
  return {
    min: minResponse.data.value,
    max: maxResponse.data.value,
  };
};

export const setMinTemperature = async (value) => {
  await axios.post(`${BASE_URL}/gv/temp/min`, { value: value });
};

export const setMaxTemperature = async (value) => {
  await axios.post(`${BASE_URL}/gv/temp/max`, { value: value });
};

export const setMinHumidity = async (value) => {
  await axios.post(`${BASE_URL}/gv/humidity/min`, { value: value });
};

export const setMaxHumidity = async (value) => {
  await axios.post(`${BASE_URL}/gv/humidity/max`, { value: value });
};
