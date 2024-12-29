import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import InvoicePage from "./components/home";
import HomePage from "./components/list";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";


function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="pt-16 bg-background">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/add' element={<InvoicePage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
