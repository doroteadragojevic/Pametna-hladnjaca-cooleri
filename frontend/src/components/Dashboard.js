import React, { useContext } from "react";
import TemperatureChart from "../components/TemperatureChart";
import MoistureChart from "../components/MoistureChart";
import { AppContext } from "../context/AppContext";
import {
  Container,
  DashboardContainer,
  Section,
  SectionTitle,
  NotificationContainer,
  NotificationItem,
  Divider,
} from "../styles";
import Settings from "../components/Settings";

const Dashboard = () => {
  const { temperatureData, moistureData, notifications, activityLog } =
    useContext(AppContext);

  const renderNotification = (type, value, status, action) => {
    let color;
    if (type === "movement") {
      color =
        status === "not recognized - light currently turned off."
          ? "grey"
          : "green";
    } else {
      color = status === "is inside the correct range" ? "green" : "red";
    }

    return (
      <NotificationItem key={type} color={color}>
        {`${type.charAt(0).toUpperCase() + type.slice(1)} ${status}`}
        {value !== null ? ` (${value}).` : ""}
        {action ? ` - ${action}` : ""}
      </NotificationItem>
    );
  };

  return (
    <Container>
      <DashboardContainer>
        <Section>
          <SectionTitle>Notifications</SectionTitle>
          <Divider />
          <NotificationContainer>
            {notifications.temperature &&
              renderNotification(
                "temperature",
                notifications.temperature.value + "°C",
                notifications.temperature.status,
                notifications.temperature.action
              )}
            {notifications.moisture &&
              renderNotification(
                "moisture",
                notifications.moisture.value + "%",
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
          <Divider />
          <TemperatureChart temperatureData={temperatureData} />
          <Divider />
          <MoistureChart moistureData={moistureData} />
        </Section>
        <Section>
          <SectionTitle>Settings</SectionTitle>
          <Divider />
          <Settings />
        </Section>
        <Section>
          <SectionTitle>Activity Log</SectionTitle>
          <Divider />
          <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
            {activityLog
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((entry, index) => (
                <div key={index}>
                  <p>
                    {new Date(entry.timestamp).toLocaleString()} -{" "}
                    {entry.message}
                  </p>
                </div>
              ))}
          </div>
        </Section>
      </DashboardContainer>
    </Container>
  );
};

export default Dashboard;
