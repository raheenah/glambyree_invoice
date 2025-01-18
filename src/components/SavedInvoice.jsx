import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Invoice from "../Data/InvoiceNumber";
import InvoiceList from "../Data/Invoices";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SavedInvoiceDetails = () => {
  const { invNum } = useParams();
  const currentInvNumber = Number(invNum);
//   console.log(currentInvNumber, currentInvNumber.type, "currentinvnum");
//   console.log(useParams(), useParams().type, "params");
//   console.log(invNum, invNum.type, "invNum");

  const [invDetails, setInvDetails] = useState(null);
const [invItems, setInvItems] = useState([])
    const [invoice, setInvoice] = useState({})
    
    
    
  const handleFetchInvDetails = () => {
   const details = InvoiceList.getInvoiceDetails(
     "invoiceList",
     currentInvNumber
      );
          console.log(
            details,
            "details"
          );


      setInvDetails(
details    );
  };
  useEffect(() => {
      handleFetchInvDetails();
      
    console.log(invDetails, "invdetails", currentInvNumber, "cuurentinvnumber");
  }, []);
    
    const handleSetInvoiceItems = () => {
               console.log("setinv items running...");

        const items = invDetails.invoiceList;
        console.log("setinv items running...")
        setInvItems(items);
        console.log(items, "items")

    }
    useEffect(() => {
        console.log("useeffect running.11..")
        if (invDetails) {
            handleSetInvoiceItems();
        }

        // console.log(invItems, "invitems")
    },[invDetails])
    
useEffect(() => {
  console.log("useEffect for invItems running...");
  console.log(invItems, "invItems");
}, [invItems]); 

      const invoiceRef = useRef();

      const downloadInvoiceAsPDF = async () => {
        const element = invoiceRef.current;

        // console.log(element, "element")
        const fixedWidth = 1024;
        const scale = 1;

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

      

      };

      const formatNumberWithCommas = (num) => {
        return num.toLocaleString();
      };

  
  
    return (
      <div className='flex flex-col min-h-screen'>
        {/* {invDetails ? <p>{invDetails.client}</p> : <p>Loading...</p>} */}
        {invDetails && invItems.length > 0 && (
          <div ref={invoiceRef} className=' px-3 py-6 my-3  w-fit  flex '>
            <div className='border mx-auto  flex flex-col w-full border-black bg-white text-black px-3 pt-6 pb-3'>
              <div className='flex flex-col justify-between '>
                <div className='flex justify-between'>
                  <div className='flex flex-col'>
                    <h1
                      id='store'
                      className='font-extrabold mb-6 text-text-accent text-5xl'
                    >
                      GlamByRee
                    </h1>
                    <p>Millenium Estate, Gbagada</p>
                    <p>Lagos, Nigeria</p>
                    {/* <p>Instagram : @Glambyree</p>
                <p>Mobile : 08106491158</p>
                <p>Email : Nureeyah1503@icloud.com</p> */}
                  </div>
                  <div className='flex flex-col items-start mt-4'>
                    <h2 className='font-extrabold text-xl'>
                      Invoice # {invDetails.invNumber}
                    </h2>
                    <p>Date : {invDetails.invoiceDate}</p>
                    {/* <p>Valid till : {expirationDate}</p> */}
                  </div>
                </div>

                <div className=' mb-5 mt-48 flex justify-between'>
                  <div className='border-2 w-fit max-w-[45%]  border-black px-4 py-2'>
                    <h1 className='font-semibold underline'>
                      Appointment Details
                    </h1>
                    <div className='flex gap-1'>
                      {/* <p className='font-semibold'>Name :</p> */}
                      Type: <b>{invDetails.type}</b>
                    </div>
                    <div className='flex gap-1'>
                      {/* <p className='font-semibold'>Number :</p> */}
                      Date: <b>{invDetails.date}</b>
                    </div>
                    <div className='flex gap-1 text-wrap break-words w-full'>
                      {/* <p className='font-semibold'>Address :</p> */}
                      <p className=' w-full'>
                        Time: <b>{invDetails.time}</b>
                      </p>
                    </div>
                  </div>
                  <div className='border-2 w-fit  max-w-[50%] self-end border-black px-4 py-2'>
                    <h1 className='font-semibold underline'>Bill To</h1>
                    <div className='flex gap-1'>
                      {/* <p className='font-semibold'>Name :</p> */}
                      {invDetails.client}
                    </div>
                    <div className='flex gap-1'>
                      {/* <p className='font-semibold'>Number :</p> */}
                      {invDetails.number}
                    </div>
                    <div className='flex gap-1 text-wrap break-words w-full'>
                      {/* <p className='font-semibold'>Address :</p> */}
                      <p className=' w-full'>{invDetails.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <table className=' w-full'>
                <thead className='bg-gray-400 font-semibold'>
                  <tr>
                    <td className='max-w-1/2 py-2 pl-2'>SERVICE</td>
                    <td className='max-w-1/6 py-2 text-right'>QTY</td>
                    <td className='max-w-1/6 py-2 pl-2 text-right'>
                      UNIT PRICE
                    </td>
                    <td className='max-w-1/6 py-2 text-right pr-2'>AMOUNT</td>
                  </tr>
                </thead>

                <tbody>
                  {invItems.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-200"
                      } text-md`}
                    >
                      <td className='w-1/2 py-2 pl-2'>{item.item}</td>
                      <td className='max-w-1/6 py-2 text-right'>
                        {item.quantity}
                      </td>
                      <td className='max-w-1/6 py-2 pl-2 text-right'>
                        ₦ {formatNumberWithCommas(item.price)}
                      </td>
                      <td className='max-w-1/6  py-2 font-semibold text-right pr-2'>
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
                      ₦ {formatNumberWithCommas(invDetails.subtotal)}.00
                    </td>
                  </tr>

                  <tr>
                    <td></td>
                    <td></td>
                    <td className='bg-gray-400 font-bold py-2 pl-2  text-right '>
                      Discount
                    </td>
                    <td className='bg-gray-400 font-bold py-2 text-right pr-2 '>
                      ₦ {formatNumberWithCommas(invDetails.discount)}.00
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className='bg-gray-400 font-bold py-2 pl-2 text-right'>
                      Total
                    </td>
                    <td className='bg-gray-400 font-bold py-2 text-right pr-2'>
                      ₦ {formatNumberWithCommas(invDetails.total)}.00
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className='border-2 my-5  w-fit max-w-[60%] self-end font-semibold  border-black px-4 py-2'>
                <h1 className='font-semibold underline'>Payment Details</h1>
                <div className='flex gap-1 items-center font-semibold'>
                  <p className='font-normal'>Bank : </p>Kuda MFB
                </div>
                <div className='flex gap-1 items-center'>
                  <p className='font-normal'>Account Number : </p>2016366060
                </div>
                <div className='flex gap-1'>
                  <p className='font-normal items-center'>Account Name :</p>
                  Nureeyah Ogunmuyiwa
                </div>
              </div>

              <div className='flex flex-col w-full'>
                <div className='text-xs mt-3 '>
                  <h2 className='font-extrabold   text-xl'>
                    PLEASE READ BEFORE PAYMENT❗
                  </h2>
                  <ul>
                    <li>
                      <h3 className='underline font-bold'>
                        Punctuality Clause
                      </h3>
                      <p>
                        To ensure a smooth and enjoyable experience, it’s
                        important that we begin your makeup session at the
                        agreed-upon time. Starting promptly allows us to give
                        you the full attention and quality you deserve.
                      </p>
                    </li>
                    <li>
                      <h3 className='underline font-bold'>
                        In the Event of Lateness;
                      </h3>
                      <ul className='list-disc pl-4'>
                        <li>
                          There is a 10 minute wait-period provided the artist
                          is informed at least 30 minutes before the appoitment.
                          I kindly encourage you to plan to arrive a few minutes
                          early, so we can make the most of our time together
                          and ensure everything runs smoothly.
                        </li>
                        <li>
                          If you arrive 30 minutes to 1 hour late, please note
                          that an additional fee of ₦10,000 per hour will apply
                          to accommodate the schedule adjustments required.
                        </li>
                        <li>
                          If you are delayed by more than 2 hours, the deposit
                          will be forfeited, and the session may need to be
                          rescheduled or canceled.
                        </li>
                      </ul>
                    </li>
                  </ul>
                  By proceeding with payment, the client agrees to all terms
                  outlined above. Kindly share payment receipt once completed.
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
        )}

        <button
          onClick={downloadInvoiceAsPDF}
          className='bg-button hover:bg-button-hover w-fit mx-auto px-4 font-bold rounded-lg py-2 mb-5 '
        >
          Download
        </button>
      </div>
    );
};

export default SavedInvoiceDetails;
