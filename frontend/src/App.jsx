import React from 'react';
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { Container } from 'react-bootstrap';
import HomePage from './pages/HomePage';
const App = () => {
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <HomePage />
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
