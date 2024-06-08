import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ActivityLog from "./pages/ActivityLog";
import { GlobalStyle, Navigation, NavLink, Container } from "./styles";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navigation>
        <NavLink href="/">Dashboard</NavLink>
        <NavLink href="/activity-log">Activity Log</NavLink>
      </Navigation>
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activity-log" element={<ActivityLog />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
