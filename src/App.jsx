import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import InvoicePage from "./components/home";
import HomePage from "./components/list";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SavedInvoiceDetails from "./components/SavedInvoice";


function App() {
  return (
    <>
      <Router>
        {/* <NavBar /> */}
        <div className=" text-text bg-background">
          <Routes>
            <Route path="/" element={<Navigate to= "/add"/>}/>
            <Route path='/list' element={<HomePage />} />
            <Route path='/add' element={<InvoicePage />} />
            <Route path="/:invNum" element={<SavedInvoiceDetails/>}/>
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
