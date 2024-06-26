import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f7f7f7;
    color: #333;
  }
`;

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #007bff;
  text-align: center;
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Section = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 10px;
  color: #333;
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NotificationItem = styled.div`
  padding: 10px;
  border-radius: 5px;
  color: white;
  background-color: ${(props) => {
    switch (props.color) {
      case "green":
        return "#4caf50"; // Green color for inside the correct range
      case "red":
        return "#f44336"; // Red color for outside the correct range
      case "grey":
        return "#9e9e9e"; // Grey color for no movement
      default:
        return "#f44336"; // Default to red if no valid color is provided
    }
  }};
`;

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282c34;
  padding: 0 20px;
  height: 60px;
  box-shadow: 0px 4px 2px -2px gray;
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  margin-right: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ContentContainer = styled.div`
  padding: 20px;
`;

export const ActivityLogContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;

export const LogList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const LogItem = styled.li`
  background: #f7f7f7;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  width: fit-content;
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const SettingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
`;
