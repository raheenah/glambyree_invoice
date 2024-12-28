import { use, useEffect } from "react";
import { useState } from "react";
import CustomLocalStorage from "../Data/InvoiceNumber";
import Invoice from "../Data/InvoiceNumber";

const InvoicePage = () => {
    const [itemsList, setItemsList] = useState([]);
    const [clientName, setClientName] = useState("");
    const [clientNumber, setClientNumber] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    const [invoiceNumber, setInvioiceNumber] = useState(2);
    const [date, setDate] = useState("2/03/2024")
    const [expirationDate, setExpirationDate] = useState("4/03/2039")
    const [itemToAdd, setItemToAdd] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");

    
    const handleUpdateInvoiceNumber = () => {
        const totalInvoices = Invoice.getLastInvoiceNumber(
          "currentInvoiceNumber"
        );
        const number = totalInvoices + 1;
        // console.log(number, "numbehjyyyr")
        setInvioiceNumber(number)
        Invoice.setLastInvoiceNumber("currentInvoiceNumber", number);
    }

    useEffect(() => {
        console.log("useeffect running")
        handleUpdateInvoiceNumber();
    }, [])

    const handleDateUpdate = () => {
const today = new Date(); 
        const formattedDate = today.toISOString().split("T")[0];
        
        const validatedTillDate = new Date(today);
        validatedTillDate.setDate(today.getDate() + 7);
            const formattedValidatedTillDate = validatedTillDate
              .toISOString()
            .split("T")[0];
        
                setDate(formattedDate);
setExpirationDate(formattedValidatedTillDate)
        
    }
       useEffect(() => {
         console.log("useeffect running");
         handleDateUpdate();
       }, []);
    
  return (
    <div>
      <div>
        <h3>Client Details</h3>
        <div>
          <label>Name</label>
          <input
            type='text'
            onChange={(e) => setClientName(e.target.value)}
            className='bg-red-100'
          />
        </div>
        <div>
          <label>Number</label>
          <input
            type='text'
            onChange={(e) => setClientNumber(e.target.value)}
            className='bg-red-100'
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type='text'
            onChange={(e) => setClientAddress(e.target.value)}
            className='bg-red-100'
          />
        </div>
      </div>
      <div>
        <h3>Add Invoice Items</h3>
        <div>
          <label>Item</label>
          <input
            type='text'
            onChange={(e) => setItemToAdd(e.target.value)}
            className='bg-red-100'
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type='text'
            onChange={(e) => setQuantity(e.target.value)}
            className='bg-red-100'
          />
        </div>
        <div>
          <label>Unit price</label>
          <input
            type='text'
            onChange={(e) => setUnitPrice(e.target.value)}
            className='bg-red-100'
          />
              </div>
              <button className="bg-red-100">add item</button>
      </div>
      <div className='flex justify-between px-3 py-6'>
        <div>
          <h1>GlamByRee</h1>
          <div>
            <p>Millenium Estate, Gbagada</p>
            <p>Lagos, Nigeria</p>
            <p>Instagram : @Glambyree</p>
            <p>Mobile : 08106491158</p>
            <p>Email : Nureeyah1503@icloud.com</p>
            <div></div>
          </div>
          <div>
            <h1>Bank Details</h1>
            <p> Bank : Kuda MFB</p>
            <p>Account Number : 2016366060</p>
            <p>Account Name : Nureeyah Ogunmuyiwa</p>
          </div>
        </div>

        <div>
          <h2>Invoice # {invoiceNumber}</h2>
          <p>Date : {date}</p>
          <p>Valid till : {expirationDate}</p>
          <div>
            <h1>Bill To</h1>
            <p>name {clientName}</p>
            <p>number {clientNumber}</p>
            <p>address {clientAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
