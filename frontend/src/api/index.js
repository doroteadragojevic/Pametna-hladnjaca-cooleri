import {
  mockTemperatureData,
  mockMoistureData,
  mockMovementData,
  mockErrorData,
} from "../mockData";

export const getTemperature = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTemperatureData);
    }, 500); // Simulate network delay
  });
};

export const getMoisture = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMoistureData);
    }, 500); // Simulate network delay
  });
};

export const getMovement = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMovementData);
    }, 500); // Simulate network delay
  });
};

export const getError = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockErrorData);
    }, 500); // Simulate network delay
  });
};

export const setMinTemperature = async (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: `Min temperature set to ${value}` });
    }, 500); // Simulate network delay
  });
};

export const setMaxTemperature = async (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: `Max temperature set to ${value}` });
    }, 500); // Simulate network delay
  });
};

export const setMinMoisture = async (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: `Min moisture set to ${value}` });
    }, 500); // Simulate network delay
  });
};

export const setMaxMoisture = async (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: `Max moisture set to ${value}` });
    }, 500); // Simulate network delay
  });
};
