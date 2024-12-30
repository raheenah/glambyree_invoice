import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Invoice from "../Data/InvoiceNumber";
import InvoiceList from "../Data/Invoices";

const SavedInvoiceDetails = () => {
  const { invNum } = useParams();
  const currentInvNumber = Number(invNum);
//   console.log(currentInvNumber, currentInvNumber.type, "currentinvnum");
//   console.log(useParams(), useParams().type, "params");
//   console.log(invNum, invNum.type, "invNum");

  const [invDetails, setInvDetails] = useState(null);

  const handleFetchInvDetails = () => {
    setInvDetails(
      InvoiceList.getInvoiceDetails("invoiceList", currentInvNumber)
    );
  };
  useEffect(() => {
    handleFetchInvDetails();
    console.log(invDetails, "invdetails", currentInvNumber, "cuurentinvnumber");
  }, []);

  return (
    <div>
      {invDetails ? <p>{invDetails.client}</p> : <p>Loading...</p>}
        

      <button
        // onClick={downloadInvoiceAsPDF}
        className='bg-button hover:bg-button-hover w-fit mx-auto px-4 font-bold rounded-lg py-2 '
      >
        Save and Download
      </button>
    </div>
  );
};

export default SavedInvoiceDetails;
