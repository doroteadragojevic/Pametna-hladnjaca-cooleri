// src/mockData/index.js
export const mockTemperatureData = [
  {
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 5)
    ).toISOString(),
    value: 22.5,
  },
  {
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 4)
    ).toISOString(),
    value: 22.7,
  },
  {
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 3)
    ).toISOString(),
    value: 23.0,
  },
  {
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 2)
    ).toISOString(),
    value: 22.8,
  },
  {
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 1)
    ).toISOString(),
    value: 23.1,
  },
];

export const mockMoistureData = [
  {
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 5)
    ).toISOString(),
    value: 55.0,
  },
  {
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 4)
    ).toISOString(),
    value: 54.8,
  },
  {
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 3)
    ).toISOString(),
    value: 54.6,
  },
  {
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 2)
    ).toISOString(),
    value: 54.7,
  },
  {
    timestamp: new Date(
      new Date().setMinutes(new Date().getMinutes() - 1)
    ).toISOString(),
    value: 54.5,
  },
];

export const mockThresholdData = {
  minTemperature: 20.0,
  maxTemperature: 25.0,
  minMoisture: 50.0,
  maxMoisture: 60.0,
};

export const mockActivityLog = [
  {
    timestamp: new Date().toISOString(),
    message: "Nova mjerenja temperature!",
  },
  {
    timestamp: new Date().toISOString(),
    message: "Očitana nova mjerenja vlage.",
  },
  {
    timestamp: new Date().toISOString(),
    message: "Detektiran pokret na ulazu u hladnjaču.",
  },
];
