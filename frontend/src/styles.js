import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
  }
`;

export const Container = styled.div`
  font-family: "Arial", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 40px;
`;

export const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Section = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  color: #555;
  margin-bottom: 20px;
`;

export const ThresholdInputs = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60px;
`;

export const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #0056b3;
  }
`;

export const ActivityLog = styled.div`
  margin-top: 40px;
`;

export const LogItem = styled.li`
  margin-bottom: 10px;
  color: #333;
`;

export const LogList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export default GlobalStyle;
