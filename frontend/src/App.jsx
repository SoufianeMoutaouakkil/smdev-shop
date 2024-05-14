import React from "react";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
