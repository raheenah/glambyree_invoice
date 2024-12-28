import { use, useEffect, useRef } from "react";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Invoice from "../Data/InvoiceNumber";

const InvoicePage = () => {
  const [itemsList, setItemsList] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvioiceNumber] = useState(2);
  const [date, setDate] = useState("2/03/2024");
  const [expirationDate, setExpirationDate] = useState("4/03/2039");
  const [itemToAdd, setItemToAdd] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [invoiceTotal, setInvoiceTotal] = useState("");

  const handleUpdateInvoiceNumber = () => {
    const totalInvoices = Invoice.getLastInvoiceNumber("currentInvoiceNumber");
    const number = totalInvoices + 1;
    // console.log(number, "numbehjyyyr")
    setInvioiceNumber(number);
    Invoice.setLastInvoiceNumber("currentInvoiceNumber", number);
  };

  useEffect(() => {
    // console.log("useeffect running");
    handleUpdateInvoiceNumber();
  }, []);

  const handleDateUpdate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    const validatedTillDate = new Date(today);
    validatedTillDate.setDate(today.getDate() + 7);
    const formattedValidatedTillDate = validatedTillDate
      .toISOString()
      .split("T")[0];

    setDate(formattedDate);
    setExpirationDate(formattedValidatedTillDate);
  };
  useEffect(() => {
    // console.log("useeffect running");
    handleDateUpdate();
  }, []);

  const handleAddNewItem = () => {
    setItemsList((prev) => {
      const updatedList = [
        ...prev,
        {
          item: itemToAdd,
          quantity: quantity,
          price: unitPrice,
          amount: unitPrice * quantity,
        },
      ];

      // Calculate total here
      const currentTotal = updatedList.reduce(
        (total, item) => total + item.amount,
        0
      );

      // Return updated list
      return updatedList;
    });

    setInvoiceTotal(currentTotal);
  };

  useEffect(() => {
    const currentTotal = itemsList.reduce(
      (total, item) => total + item.amount,
      0
    );
    setInvoiceTotal(currentTotal); // Update total in state
  }, [itemsList]);
    
    const invoiceRef = useRef();

const downloadInvoiceAsPDF = async () => {
    const element = invoiceRef.current; 
    
    console.log(element, "element")
  const canvas = await html2canvas(element, {
    scale: 2, // Increases the resolution
    useCORS: true, // Ensures styles and external images are captured
  });
    console.log(canvas, "canvas")

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("invoice.pdf");
};

    
    

  return (
    <div className='flex flex-col gap-4 py-4 bg-background text-text'>
      <div className='grid grid-cols-2 items-start'>
        <div className='flex flex-col gap-2 w-fit justify-self-center'>
          <h3 className=' font-extrabold text-text underline'>
            Client Details
          </h3>
          <div className='flex flex-col'>
            <label className='font-semibold'>Name</label>
            <input
              type='text'
              onChange={(e) => setClientName(e.target.value)}
              className='bg-input-background rounded focus:outline-none focus:border-b-2 focus:border-b-input-border hover:border-b-2 hover:border-b-input-border px-2 py-1'
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Number</label>
            <input
              type='text'
              onChange={(e) => setClientNumber(e.target.value)}
              className='bg-input-background rounded focus:outline-none focus:border-b-2 focus:border-b-input-border hover:border-b-2 hover:border-b-input-border px-2 py-1'
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Address</label>
            <input
              type='text'
              onChange={(e) => setClientAddress(e.target.value)}
              className='bg-input-background rounded focus:outline-none focus:border-b-2 focus:border-b-input-border hover:border-b-2 hover:border-b-input-border px-2 py-1'
            />
          </div>
        </div>
        <div className='flex flex-col gap-2 w-fit justify-self-center'>
          <div className='flex justify-between'>
            <h3 className=' font-extrabold text-text underline'>
              Invoice Item
            </h3>
            <button
              onClick={handleAddNewItem}
              className='bg-button  px-1 rounded-full hover:bg-button-hover'
            >
              <i className='fa-solid fa-plus'></i>{" "}
            </button>
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Item</label>
            <input
              type='text'
              onChange={(e) => setItemToAdd(e.target.value)}
              className='bg-input-background rounded focus:outline-none focus:border-b-2 focus:border-b-input-border hover:border-b-2 hover:border-b-input-border px-2 py-1'
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Quantity</label>
            <input
              type='text'
              onChange={(e) => setQuantity(e.target.value)}
              className='bg-input-background rounded focus:outline-none focus:border-b-2 focus:border-b-input-border hover:border-b-2 hover:border-b-input-border px-2 py-1'
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'>Unit price</label>
            <input
              type='text'
              onChange={(e) => setUnitPrice(e.target.value)}
              className='bg-input-background rounded focus:outline-none focus:border-b-2 focus:border-b-input-border hover:border-b-2 hover:border-b-input-border px-2 py-1'
            />
          </div>
        </div>
      </div>

      <div
        ref={invoiceRef}
        className=' px-3 py-6 m-3  border border-input-border'
      >
        <div className='flex flex-col justify-between '>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <h1
                id='store'
                className='font-extrabold mb-1 text-text-accent text-3xl'
              >
                GlamByRee
              </h1>
              <p>Millenium Estate, Gbagada</p>
              <p>Lagos, Nigeria</p>
              <p>Instagram : @Glambyree</p>
              <p>Mobile : 08106491158</p>
              <p>Email : Nureeyah1503@icloud.com</p>
            </div>
            <div className='flex flex-col items-start'>
              <h2 className='font-extrabold text-xl'>
                Invoice # {invoiceNumber}
              </h2>
              <p>Date : {date}</p>
              <p>Valid till : {expirationDate}</p>
            </div>
          </div>

          <div className='grid grid-cols-2 my-2'>
            <div className='border-2 w-fit border-input-border px-4 py-2'>
              <h1 className='font-semibold underline'>Payment Details</h1>
              <div className='flex gap-1'>
                <p className='font-semibold'>Bank : </p>Kuda MFB
              </div>
              <div className='flex gap-1'>
                <p className='font-semibold'>Account Number : </p>2016366060
              </div>
              <div className='flex gap-1'>
                <p className='font-semibold'>Account Name</p>Nureeyah Ogunmuyiwa
              </div>
            </div>
            <div className='border-2 w-fit max-w-[70%] justify-self-end border-input-border px-4 py-2'>
              <h1 className='font-semibold underline'>Bill To</h1>
              <div className='flex gap-1'>
                {/* <p className='font-semibold'>Name :</p> */}
                {clientName}
              </div>
              <div className='flex gap-1'>
                {/* <p className='font-semibold'>Number :</p> */}
                {clientNumber}
              </div>
              <div className='flex gap-1 text-wrap break-words w-full'>
                {/* <p className='font-semibold'>Address :</p> */}
                <p className=' w-full'>{clientAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <table className=' w-full'>
          <thead className='bg-table-header font-semibold '>
            <tr>
              <td className='w-1/2'>ITEM</td> {/* Widest column */}
              <td className='w-1/12'>QTY</td>
              <td className='w-1/6'>UNIT PRICE</td>
              <td className='w-1/6'>AMOUNT</td>
            </tr>
          </thead>

          <tbody>
            {itemsList.map((item, index) => (
              <tr key={index}>
                <td className='w-1/2'>{item.item}</td>
                <td className='w-1/12'>{item.quantity}</td>
                <td className='w-1/6'>{item.price}</td>
                <td className='w-1/6'>{item.amount}</td>
              </tr>
            ))}

            <tr>
              <td colSpan={3}>Total:</td>
              <td> {invoiceTotal}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <h3> ‼PLEASE READ BEFORE PAYMENT‼</h3>
          <p>
            Punctuality Clause To ensure a smooth and enjoyable experience, it’s
            important that we begin your makeup session at the agreed-upon time.
            Starting promptly allows us to give you the full attention and
            quality you deserve. In the Event of Lateness,
          </p>
          • There is a 10 minute wait-period provided the artist is informed at
          least 30 minutes before the appoitment. • If you arrive 30 minutes to
          1 hour late, please note that an additional fee of ₦10,000 per hour
          will apply to accommodate the schedule adjustments required. • If you
          are delayed by more than 2 hours, the deposit will be forfeited, and
          the session may need to be rescheduled or canceled. I kindly encourage
          you to plan to arrive a few minutes early, so we can make the most of
          our time together and ensure everything runs smoothly. By proceeding
          with payment, the client agrees to all terms outlined above. Kindly
          share payment receipt once completed.
        </div>
      </div>

      <button
        onClick={downloadInvoiceAsPDF}
        className='bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700'
      >
        Download as PDF
      </button>
    </div>
  );
};

export default InvoicePage;
