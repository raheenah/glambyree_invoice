import { use, useEffect, useRef } from "react";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Invoice from "../Data/InvoiceNumber";
import InvoiceList from "../Data/Invoices";
import Logo from "../assets/GBR LOGO white.png";
import { NavLink , useNavigate } from "react-router-dom";


const InvoicePage = () => {
  const [itemsList, setItemsList] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvioiceNumber] = useState(null);
  const [date, setDate] = useState("2/03/2024");
  const [expirationDate, setExpirationDate] = useState("4/03/2039");
  const [itemToAdd, setItemToAdd] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState("");
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [savedInoiceDetaile, setSavedInvoiceDetails] = useState({});
  const [appType, setAppType] = useState(null);
  const [appTime, setAppTime] = useState(null);
  const [appDate, setAppDate] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [inSubTotal, setInvSubTotal] = useState(0);
  const [selectedBusiness, setSelectedBusiness] = useState("glambyree");
  const [isAsideVisible, setIsAsideVisible] = useState(false);
    const navigate = useNavigate();


  const handleUpdateInvoiceNumber = () => {
    const totalInvoices = Invoice.getLastInvoiceNumber("currentInvoiceNumber");
    const number = totalInvoices + 1;
    // console.log(number, "numbehjyyyr")
    setInvioiceNumber(number);
    // Invoice.setLastInvoiceNumber("currentInvoiceNumber", number);
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
    if (!itemToAdd.trim() || !unitPrice || !quantity) {
      alert("Please input the item details");
      return;
    }

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

      const currentTotal = updatedList.reduce(
        (total, item) => total + item.amount,
        0
      );

      const actualTotal = currentTotal - discount;
      return updatedList;
    });

    // setInvSubTotal(currentTotal);
    // setInvoiceTotal(actualTotal);
  };

  useEffect(() => {
    const currentTotal = itemsList.reduce(
      (total, item) => total + item.amount,
      0
    );
    const actualTotal = currentTotal - discount;

    setInvSubTotal(currentTotal);
    setInvoiceTotal(actualTotal);
  }, [itemsList, discount]);

  const invoiceRef = useRef();

  const downloadInvoiceAsPDF = async () => {
    const element = invoiceRef.current;

    // console.log(element, "element")
    const fixedWidth = 1024;
    const scale = 2;

    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      windowWidth: fixedWidth,
      width: fixedWidth,
    });
    // console.log(canvas, "canvas")

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");

    const detailsToSave = {
      client: clientName,
      addrress: clientAddress,
      number: clientNumber,
      invoiceDate: date,
      expiryDate: expirationDate,
      invoiceList: itemsList,
      total: invoiceTotal,
      invNumber: invoiceNumber,
      discount: discount,
      type: appType,
      date: appDate,
      time: appTime,
      subtotal: inSubTotal,
      brand: selectedBusiness,
      paid: false,
    };

    InvoiceList.addInvoice("invoiceList", detailsToSave);

    handleUpdateInvoiceNumber();
    Invoice.setLastInvoiceNumber(
      "currentInvoiceNumber",
      Invoice.getLastInvoiceNumber("currentInvoiceNumber") + 1
    );

    setInvioiceNumber(invoiceNumber + 1);
  };

  const formatNumberWithCommas = (num) => {
    return num.toLocaleString();
  };

  // useEffect(() => {
  //   if (isAsideVisible) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [isAsideVisible]);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreadeQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };

  return (
    <div
      className={`flex flex-col py-4 min-h-screen gap-4  bg-background text-text`}
    >
      <div className=' flex  flex-col px-3   w-full z-51'>
        <div className='flex py-4 items-center text-text justtfy-center p-0'>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/list");
              }
            }}
            className='  flex gap-2 hover:text-text-secondary  items-center'
          >
            <i className='fa-solid text-inherit fa-angle-left'></i>{" "}
            <p className='hidden md:block'>Back to list</p>
          </NavLink>
          <div className='flex py-2 gap-2 font-dancing  px-8 shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-5px_10px_rgba(255,255,255,0.2)] rounded-lg bg-button text-center   mx-auto  items-center justify-evenly '>
            <button
              // value={selectedBusiness}
              // value='glambyree'
              onClick={() => setSelectedBusiness("glambyree")}
              className={`p-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedBusiness === "glambyree"
                  ? "bg-button-hover text-white shadow-lg"
                  : "text-text-secondary hover:text-white hover:underline"
              }`}
            >
              Glambyree
            </button>{" "}
            <div className='text-text-secondary'>|</div>
            <button
              // value={selectedBusiness}
              // value='lumiere'
              onClick={() => setSelectedBusiness("lumiere")}
              className={`p-2 rounded-lg font-semibold transition-all duration-300 ${
                selectedBusiness === "lumiere"
                  ? "bg-button-hover text-white shadow-lg"
                  : "text-text-secondary hover:text-white hover:underline"
              }`}
            >
              Lumière
            </button>
          </div>
          <button
            className='hover:text-text-secondary '
            onClick={() => {
              setIsAsideVisible(!isAsideVisible);
            }}
          >
            <i className='fas fa-sliders-h'></i>
          </button>
        </div>

        <aside
          onClick={(e) => e.stopPropagation()}
          className={`fixed text-sm font-normal items-center justify-center z-55 overflow-y-auto top-0 right-0 h-full w-[70%] md:w-[50%] lg:w-[35%] shadow-lg bg-background border-l border-border-color transition-transform duration-300 px-4 py-2
    ${isAsideVisible ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className='flex items-center justify-center h-full w-full'>
            <div className='flex items-start  flex-col gap-4'>
              {/* Close Button */}
              {/* <div className='  z-50  w-full  flex justify-start'>
              <button
                onClick={() => setIsAsideVisible(!isAsideVisible)}
                className='text-primary hover:text-primary-dark'
              >
                <i className='fa-solid fa-angle-left '></i>
              </button>
            </div> */}

              {/* Invoice Header */}
              <div className='flex  flex-col gap-2 p-4  rounded-lg shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)]'>
                <h3 className='text-md font-extrabold text-primary '>
                  Invoice Details
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  {/* Client Details */}
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                      <label className='font- text-text'>Client's Name</label>
                      <input
                        type='text'
                        onChange={(e) => setClientName(e.target.value)}
                        className='bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label className='font- text-text'>Client's Number</label>
                      <input
                        type='text'
                        onChange={(e) => setClientNumber(e.target.value)}
                        className='bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label className='font- text-text'>
                        Client's Address
                      </label>
                      <textarea
                        onChange={(e) => setClientAddress(e.target.value)}
                        className='bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label className='font- text-text'>
                        Invoice Discount
                      </label>
                      <input
                        type='number'
                        onChange={(e) => setDiscount(e.target.value)}
                        className='bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                      />
                    </div>
                  </div>
                  {/* Appointment Details */}
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                      <label className='font- text-text'>
                        Appointment Type
                      </label>
                      <input
                        type='text'
                        onChange={(e) => setAppType(e.target.value)}
                        className='bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label className='font- text-text'>
                        Appointment Date
                      </label>
                      <input
                        type='date'
                        onChange={(e) => setAppDate(e.target.value)}
                        className='bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label className='font- text-text'>
                        Appointment Time
                      </label>
                      <input
                        type='time'
                        onChange={(e) => setAppTime(e.target.value)}
                        className='bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Items */}
              <div className='flex flex-col gap-2 p-4  rounded-lg shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)]'>
                <h3 className='text-md font-extrabold text-primary '>
                  Add Items
                </h3>
                <form className='flex flex-col text-sm gap-4 items-center  '>
                  <div className='flex w-full gap-2'>
                    <div className='flex flex-col gap-1 w-3/4  bg- items-start'>
                      <label className='font text-text'>Service</label>

                      <input
                        type='text'
                        placeholder='Item'
                        onChange={(e) => setItemToAdd(e.target.value)}
                        className='bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                      />
                    </div>
                    <div className='flex flex-col gap-1  w-1/4 font-normal   bg- items-start'>
                      <label className='font- text-text'>Quantity</label>

                      <input
                        type='number'
                        placeholder={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className='input-field  text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                      />
                    </div>
                  </div>
                  <div className=' flex w-full items-end gap-2 '>
                    <div className='flex-col w-full  items-center '>
                      <label className='font- text-text'>Price</label>
                      <input
                        type='number'
                        placeholder='0.00'
                        onChange={(e) => setUnitPrice(e.target.value)}
                        className='input-field   text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                      />
                    </div>
                    <button
                      onClick={handleAddNewItem}
                      type='button'
                      className='btn-primary  font-bold  shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-5px_10px_rgba(255,255,255,0.2)] hover:bg-background-secondary   w-fit px-2 border-b-2 border-b-button  rounded-lg py-1'
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div
        ref={invoiceRef}
        onClick={() => {
          setIsAsideVisible(false);
        }}
        className=' px-3  my-3  w-fit max-w-[100%] '
      >
        <div className='border mx-auto  flex flex-col w-full text-black bg-white border-black px-3 pt-6 pb-3'>
          <div className='flex flex-col justify-between '>
            <div className='flex justify-between'>
              <div className='flex flex-col  max-w-[35%]'>
                {/* <h1
                  id='store'
                  className='font-extrabold mb-6 text-black text-5xl'
                >
                  GlamByRee
                </h1> */}
                {selectedBusiness === "glambyree" && (
                  <img src={Logo} alt='Glam By Ree Logo' className='w-fit' />
                )}
                {selectedBusiness === "lumiere" && (
                  <h1 id='store' className='text-6xl font-dancing'>
                    Lumière
                  </h1>
                )}

                <div>
                  <p>Millenium Estate, Gbagada</p>
                  <p>Lagos, Nigeria</p>
                </div>
                {/* <p>Instagram : @Glambyree</p>
                <p>Mobile : 08106491158</p>
                <p>Email : Nureeyah1503@icloud.com</p> */}
              </div>
              <div className='flex flex-col items-start mt-4'>
                <h2 className='font-extrabold text-xl'>
                  Invoice # {invoiceNumber}
                </h2>
                <p>Date : {date}</p>
                {/* <p>Valid till : {expirationDate}</p> */}
              </div>
            </div>

            <div className=' mb-5 mt-48 flex justify-between'>
              <div className='border-2 w-fit max-w-[45%]  border-black px-4 py-2'>
                <h1 className='font-semibold underline'>Appointment Details</h1>
                <div className='flex gap-1'>
                  {/* <p className='font-semibold'>Name :</p> */}
                  Type: <b>{appType}</b>
                </div>
                <div className='flex gap-1'>
                  {/* <p className='font-semibold'>Number :</p> */}
                  Date: <b>{appDate}</b>
                </div>
                <div className='flex gap-1 text-wrap break-words w-full'>
                  {/* <p className='font-semibold'>Address :</p> */}
                  <p className=' w-full'>
                    Time: <b>{appTime}</b>
                  </p>
                </div>
              </div>
              <div className='border-2 w-fit  max-w-[45%]  border-black px-4 py-2'>
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
            <thead className='bg-gray-400  font-semibold '>
              <tr className=' '>
                <td className='w-1/2 py-2 pl-2'>SERVICE</td>
                <td className='max-w-1/12 py-2 text-right'>QTY</td>
                <td className='max-w-1/6 py-2 pl-2 text-right'>UNIT PRICE </td>
                <td className='max-w-1/6 py-2 text-right pr-2'>AMOUNT </td>
              </tr>
            </thead>

            <tbody>
              {itemsList.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                >
                  <td className='w-1/2 py-2 pl-2'>{item.item}</td>
                  <td className='max-w-1/12 py-2 text-right'>
                    {item.quantity}
                  </td>
                  <td className='max-w-1/12 py-2 pl-2 text-right'>
                    ₦ {formatNumberWithCommas(item.price)}
                  </td>
                  <td className='max-w-1/4 py-2 font-semibold text-right pr-2'>
                    ₦ {formatNumberWithCommas(item.amount)}.00
                  </td>
                </tr>
              ))}

              <tr>
                <td></td>
                <td></td>
                <td className='bg-gray-400 font-bold py-2 pl-2  text-right '>
                  Sub-Total
                </td>
                <td className='bg-gray-400 font-bold py-2 text-right pr-2 '>
                  ₦ {formatNumberWithCommas(inSubTotal)}.00
                </td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td className='bg-gray-400 font-bold py-2 pl-2  text-right '>
                  Discount
                </td>
                <td className='bg-gray-400 font-bold py-2 text-right pr-2 '>
                  ₦ {formatNumberWithCommas(discount)}.00
                </td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td className='bg-gray-400 font-bold py-2 pl-2  text-right '>
                  Total
                </td>
                <td className='bg-gray-400 font-bold py-2 text-right pr-2 '>
                  ₦ {formatNumberWithCommas(invoiceTotal)}.00
                </td>
              </tr>
            </tbody>
          </table>
          <div className='border-2  my-5 w-fit max-w-[60%] self-end font-semibold  border-black px-4 py-2'>
            <h1 className='font-semibold underline'>Payment Details</h1>
            <div className='flex gap-1 items-center font-semibold'>
              <p className='font-normal '>Bank : </p>Kuda MFB
            </div>
            <div className='flex gap-1 items-center'>
              <p className='font-normal'>Account Number : </p>2016366060
            </div>
            <div className='flex gap-1 items-center'>
              <p className='font-normal'>Account Name :</p>Nureeyah Ogunmuyiwa
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <div className='text-xs '>
              <h2 className='font-extrabold text-xl'>
                PLEASE READ BEFORE PAYMENT ❗
              </h2>
              <ul>
                <li>
                  <h3 className='underline font-bold'>Punctuality Clause</h3>
                  <p>
                    To ensure a smooth and enjoyable experience, it’s important
                    that we begin your makeup session at the agreed-upon time.
                    Starting promptly allows us to give you the full attention
                    and quality you deserve.
                  </p>
                </li>
                <li>
                  <h3 className='underline font-bold'>
                    In the Event of Lateness;
                  </h3>
                  <ul className='list-disc pl-4'>
                    <li>
                      There is a 10 minute wait-period provided the artist is
                      informed at least 30 minutes before the appoitment. I
                      kindly encourage you to plan to arrive a few minutes
                      early, so we can make the most of our time together and
                      ensure everything runs smoothly. By proceeding with
                      payment, the client agrees to all terms outlined above.
                      Kindly share payment receipt once completed.
                    </li>
                    <li>
                      If you arrive 30 minutes to 1 hour late, please note that
                      an additional fee of ₦10,000 per hour will apply to
                      accommodate the schedule adjustments required.
                    </li>
                    <li>
                      If you are delayed by more than 2 hours, the deposit will
                      be forfeited, and the session may need to be rescheduled
                      or canceled.
                    </li>
                  </ul>
                  <p>
                    By proceeding with payment, the client agrees to all terms
                    outlined above. Kindly share payment receipt once completed.
                  </p>
                </li>
              </ul>
            </div>
            <div className='flex flex-col gap-1'>
              <h3 className='text-xs mt-6 underline font-bold'>
                For inquiries;
              </h3>
              <div className='flex w-full text-[10px] self-end gap-2 items-center'>
                <p className=' w-fit flex gap-1 items-center'>
                  <i className='fa-brands fa-instagram'></i>@Glambyree
                </p>
                <p className=' w-fit flex gap-1 items-center'>
                  <i className='fa-solid fa-phone'></i>08106491158
                </p>
                <p className=' w-fit flex gap-1 items-center'>
                  <i className='fa-solid fa-envelope'></i>
                  Nureeyah1503@icloud.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={downloadInvoiceAsPDF}
        className='btn-primary  font-bold  shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-5px_10px_rgba(255,255,255,0.2)] hover:bg-background-secondary mx-auto  w-fit px-2 border-b-2 border-b-button  rounded-lg py-1'
      >
        Save and Download
      </button>
    </div>
  );
};

export default InvoicePage;
