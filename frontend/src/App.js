import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AppProvider from "./context/AppContext";
import { GlobalStyle, Navigation, Container } from "./styles";

function App() {
  return (
    <AppProvider>
      <Router>
        <GlobalStyle />
        <Navigation>
          <h1 style={{ color: "white", margin: 0, paddingLeft: 5 }}>
            Pametna Hladnjača - Dashboard
          </h1>
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
