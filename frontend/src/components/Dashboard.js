import React, { useContext } from "react";
import TemperatureChart from "../components/TemperatureChart";
import MoistureChart from "../components/MoistureChart";
import { AppContext } from "../context/AppContext";
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
  const { temperatureData, moistureData, movementData, notifications } =
    useContext(AppContext);

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
        <Section>
          <SectionTitle>Activity Log</SectionTitle>
          {movementData.length > 0 ? (
            movementData.map((data, index) => (
              <div key={index}>
                <p>Movement: {data.value}</p>
                <p>Time: {new Date(data.timestamp).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No movement data available</p>
          )}
        </Section>
      </DashboardContainer>
    </Container>
  );
};

export default Dashboard;
