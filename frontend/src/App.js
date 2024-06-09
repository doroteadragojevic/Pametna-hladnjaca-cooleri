import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AppProvider from "./context/AppContext";
import { GlobalStyle, Navigation, NavLink, Container } from "./styles";

function App() {
  return (
    <AppProvider>
      <Router>
        <GlobalStyle />
        <Navigation>
          <NavLink href="/">Dashboard</NavLink>
        </Navigation>
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Container>
      </Router>
    </AppProvider>
  );
}

export default App;
