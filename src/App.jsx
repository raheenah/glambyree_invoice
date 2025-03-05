import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import InvoicePage from "./components/home";
import HomePage from "./components/list";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SavedInvoiceDetails from "./components/SavedInvoice";
import NotFound from "./components/404";

function App() {
  return (
    <>
      <Router>
        {/* <NavBar /> */}
        <div className=' text-text bg-background'>
          <Routes>
            <Route path='/' element={<Navigate to='/add' />} />
            <Route path='/list' element={<HomePage />} />
            <Route path='/add' element={<InvoicePage />} />
            <Route path='/invoice/:invNum' element={<SavedInvoiceDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
