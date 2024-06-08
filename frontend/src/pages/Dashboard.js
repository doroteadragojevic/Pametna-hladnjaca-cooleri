import React, { useState, useEffect } from "react";
import TemperatureChart from "../components/TemperatureChart";
import MoistureChart from "../components/MoistureChart";
import {
  mockTemperatureData,
  mockMoistureData,
  mockNotifications,
} from "../mockData";
import {
  Container,
  Title,
  DashboardContainer,
  Section,
  SectionTitle,
  NotificationContainer,
  NotificationItem,
} from "../styles";
import Settings from "../components/Settings";

const Dashboard = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [moistureData, setMoistureData] = useState([]);
  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    setTemperatureData(mockTemperatureData);
    setMoistureData(mockMoistureData);
    setNotifications(mockNotifications);
  }, []);

  const renderNotification = (type, value, status, action) => {
    let color = "green";
    if (status !== "correct range") {
      color = "red";
    }

    return (
      <NotificationItem key={type} color={color}>
        {`${type.charAt(0).toUpperCase() + type.slice(1)} ${status}`}
        {value !== null ? `: ${value}` : ""}
        {action ? ` - ${action}` : ""}
      </NotificationItem>
    );
  };

  return (
    <Container>
      <Title>Pametna Hladnjača - Dashboard</Title>
      <DashboardContainer>
        <Section>
          <SectionTitle>Notifications</SectionTitle>
          <NotificationContainer>
            {notifications.temperature &&
              renderNotification(
                "temperature",
                notifications.temperature.value,
                notifications.temperature.status,
                notifications.temperature.action
              )}
            {notifications.moisture &&
              renderNotification(
                "moisture",
                notifications.moisture.value,
                notifications.moisture.status,
                notifications.moisture.action
              )}
            {notifications.movement &&
              renderNotification(
                "movement",
                null,
                notifications.movement.status,
                notifications.movement.action
              )}
          </NotificationContainer>
        </Section>
        <Section>
          <SectionTitle>Graphs</SectionTitle>
          <TemperatureChart temperatureData={temperatureData} />
          <MoistureChart moistureData={moistureData} />
        </Section>
        <Section>
          <SectionTitle>Settings</SectionTitle>
          <Settings />
        </Section>
      </DashboardContainer>
    </Container>
  );
};

export default Dashboard;
