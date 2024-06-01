import axios from "axios";

export const getTemperature = async () => {
  const response = await axios.get("/api/temperature");
  return response.data;
};

export const getMoisture = async () => {
  const response = await axios.get("/api/moisture");
  return response.data;
};

export const getMovement = async () => {
  const response = await axios.get("/api/movement");
  return response.data;
};

export const getError = async () => {
  const response = await axios.get("/api/error");
  return response.data;
};
