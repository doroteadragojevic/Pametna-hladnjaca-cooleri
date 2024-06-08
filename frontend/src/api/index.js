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

export const getError = async () => {
  const response = await axios.get(`${BASE_URL}/error/temp`);
  return response.data;
};

export const setMinTemperature = async (value) => {
  const response = await axios.post(`${BASE_URL}/gv/temp`, { value });
  return response.data;
};

export const setMaxTemperature = async (value) => {
  const response = await axios.post(`${BASE_URL}/gv/temp`, { value });
  return response.data;
};

export const setMinMoisture = async (value) => {
  const response = await axios.post(`${BASE_URL}/gv/humidity`, { value });
  return response.data;
};

export const setMaxMoisture = async (value) => {
  const response = await axios.post(`${BASE_URL}/gv/humidity`, { value });
  return response.data;
};
