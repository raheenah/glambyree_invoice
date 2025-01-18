import { useEffect, useState } from "react";
import InvoiceList from "../Data/Invoices";
import { NavLink, useNavigate } from "react-router-dom";
// import { list } from "postcss";

const HomePage = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedList, setPaginatedList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [invNumber, setInvNumber] = useState(null);
const [amountPaid, setAmountPaid] = useState(0)
  const [invPaid, setInvPaid] = useState(null)  
  

  const handlePagination = () => {
    // console.log("invoicelist paginate", invoiceList)
    const filteredClients = invoiceList.filter((invoice) => {
      const matchesClient = invoice.client
        ?.toLowerCase()
        .includes(searchKeyword.toLowerCase());

      const matchesInvoiceNumber =
        invNumber === null || invoice.number?.includes(invNumber);

      //   invoiceList.invnumber.includes(invNumber);

      return matchesClient && matchesInvoiceNumber;
    });
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredClients.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    setPaginatedList(currentItems);

    setTotalPages(Math.ceil(filteredClients.length / itemsPerPage));
  };

  const handlePreviousButtton = () => {
    if (currentPage <= 1) {
      setCurrentPage(1);
      }
    else {
        setCurrentPage(currentPage -1)
      }
    };
      const handleNextButton = () => {
        if (currentPage >= totalPages) {
          setCurrentPage(totalPages);
        } else {
          setCurrentPage(currentPage + 1);
        }
  };
  const handleLastButton = () => {
   setCurrentPage(totalPages);
    
  };
    const handleFirstButton = () => {
      setCurrentPage(1);
    };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, invNumber]);

  useEffect(() => {
    handlePagination();
  }, [currentPage, invoiceList, searchKeyword, invNumber]);

  const handleFetchInvoiceList = () => {
    const list = InvoiceList.getInvoiceList("invoiceList");
    setInvoiceList(list);
    // console.log(list, "invoicelist");
  };
  useEffect(() => {
    handleFetchInvoiceList();
    
  }, []);

  const formatNumberWithCommas = (num) => {
    return num.toLocaleString();
  };

  const handleNavigateToCreateInvoice = () => {
    navigate("/add");
  };
  // const handleUpdatePaidStatus = (invoiceNumber) => {
  //   InvoiceList.updateInvoicePaidStatus("invoiceList", invoiceNumber);
  //   const updatedInvoices = InvoiceList.getInvoiceList("invoiceList"); // Get updated list
  //   setInvoiceList(updatedInvoices);
  //   // alert(`Invoice ${invoiceNumber} marked as paid!`);
  // };

  // const updatePaidInvoices = () => {
  //   if (!invoiceList || invoiceList.length === 0) {
  //     console.log("No invoices available to process.");
  //     setInvPaid([]);
  //     setAmountPaid(0);
  //     return;
  //   }

  //   console.log("Processing Invoice List:", invoiceList);
  //   const paid = invoiceList.filter((invoice) => invoice.paid);
  //   setInvPaid(paid);
  //   console.log("Filtered Paid Invoices:", paid);

  //   const total = paid.reduce((acc, invoice) => acc + (invoice.total || 0), 0);
  //   setAmountPaid(total);
  // };

   
  // useEffect(() => {
  //     updatePaidInvoices();
    
  // }, []);

  useEffect(() => {
    // Recalculate totals after invoiceList is updated
    if (invoiceList.length > 0) {
      const paidInvoices = invoiceList.filter((invoice) => invoice.paid);
      setInvPaid(paidInvoices.length);

      const totalPaidAmount = paidInvoices.reduce(
        (acc, invoice) => acc + invoice.total,
        0
      );
      setAmountPaid(totalPaidAmount);
    }
  }, [invoiceList]); // Runs every time invoiceList changes

  const handleUpdatePaidStatus = (invNumber) => {
    // Update the paid status of the invoice
    InvoiceList.updateInvoicePaidStatus("invoiceList", invNumber);

    // After updating, refetch the invoice list and recalculate totals
    handleFetchInvoiceList();
  };


  return (
    <div className='flex flex-col gap-3 px-3 min-h-screen'>
      <div className='flex justify-around'>
        <p>
          <b>Total Invoices Paid:</b>
          {invPaid}
        </p>
        <p>
          <b>Total Amount Paid:</b> ₦ {formatNumberWithCommas(amountPaid)}.00
        </p>
        {/* <button onClick={updatePaidInvoices()}>count paid inv</button> */}
      </div>
      <div className='flex justify-between gap-3'>
        <button
          onClick={handleNavigateToCreateInvoice}
          className='border-2 border-button text-button hover:text-button-hover px-2 py-1 rounded-lg hover:border-button-hover'
        >
          <i className='fa-solid fa-plus'></i>{" "}
        </button>

        <div className='flex justify-between gap-3 w-full'>
          <input
            type='text'
            className='border-2 placeholder:text-text  border-button bg-transparent  px-2 py-1 rounded w-full'
            placeholder='Client name...'
            onChange={(e) => setSearchKeyword(e.target.value)}
          ></input>
          <input
            className='border-2 placeholder:text-text border-button px-2 bg-transparent py-1 rounded'
            type='text'
            placeholder='Inv number...'
            onChange={(e) => setInvNumber(e.target.value)}
          ></input>
        </div>
      </div>
      <ul className='flex flex-col  gap-2'>
        {paginatedList.map((item, index) => (
          <li
            key={index}
            className='bg-table-row flex flex-col items-center border-2 py-1 w-[70%] mx-auto rounded-lg border-table-border'
          >
            {" "}
            <NavLink
              to={`/${item.invNumber}`}
              className=' flex flex-col items-center w-full '

              // className=' text-button hover:text-button-hover px-2 py-1 rounded-lg hover:border-button-hover'
            >
              <div className='flex font-bold items-center w-full px-3 justify-between'>
                <p className='w-full py-2  pl-2'>{item.client}</p>
                <p className='font-bold p-2'> {item.invNumber}</p>
                {/* <p>{item.paid ? "Paid" : "amount not paid"}</p> */}
              </div>
              {/* <p>{formatNumberWithCommas(item.total)}</p> */}
              {/* <p>{item.invoiceDate}</p> */}
              <ul className='pl-4 max-h-32 flex flex-col items-center overflow-y-auto custom-scrollbar'>
                {item.invoiceList.map((invoiceItem, invoiceIndex) => (
                  <li
                    key={invoiceIndex}
                    className='flex justify-between border-b py-1'
                  >
                    <span>{invoiceItem.item}</span>
                  </li>
                ))}
              </ul>{" "}
            </NavLink>
            <button
              onClick={() => handleUpdatePaidStatus(item.invNumber)}
              className='bg-button px-4 py-2 mb-2 rounded'
            >
              {item.paid ? "Mark Unpaid" : "Mark Paid"}
            </button>
            {/* <i className='fa-solid fa-arrow-up-right-from-square'></i> */}
            {/* </NavLink> */}
            {/* <p>{item.invoiceList.} </p> */}
          </li>
        ))}
      </ul>
      <div className='flex gap-4 items-center w-fit mx-auto py-3'>
        <button
          className=' text-button hover:text-button-hover rounded-lg hover:border-button-hover'
          onClick={handleFirstButton}
        >
          <i className='fa-solid fa-angles-left'></i>
        </button>
        <button
          className=' text-button hover:text-button-hover rounded-lg hover:border-button-hover'
          onClick={handlePreviousButtton}
        >
          <i className='fa-solid fa-angle-left'></i>
        </button>
        <p>{currentPage}</p>
        <button
          className=' text-button hover:text-button-hover rounded-lg hover:border-button-hover'
          onClick={handleNextButton}
        >
          <i className='fa-solid fa-angle-right'></i>
        </button>
        <button
          className=' text-button hover:text-button-hover  rounded-lg hover:border-button-hover'
          onClick={handleLastButton}
        >
          <i className='fa-solid fa-angles-right'></i>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
