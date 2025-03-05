import { useEffect, useState } from "react";
import InvoiceList from "../Data/Invoices";
import { NavLink, useNavigate } from "react-router-dom";
import { use } from "react";
// import { list } from "postcss";

const HomePage = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedList, setPaginatedList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [invNumber, setInvNumber] = useState(null);
  const [amountPaid, setAmountPaid] = useState(0);
  const [glambyreeAmountPaid, setGlambyreeAmountPaid] = useState(0);
  const [totalInvoices, setTotalInvoice] = useState(0)
  const [totalGlambyreeInvoices, setTotalGlambyreeInvoices] = useState(0)
  const [totalLumiereInvoices, setTotalLumiereInvoices] = useState(0)
  const [lumiereAmountPaid, setLumiereAmountPaid] = useState(0);
  const [invPaid, setInvPaid] = useState(0);
  const [glambyreeInvPaid, setGlambyreeInvPaid] = useState(0);
  const [lumiereInvPaid, setLumiereInvPaid] = useState(0);
  const [searchBrand, setSearchBrand] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchStatus, setSearchStatus] = useState("all");
  const [detailsOpen, setDetailsOpen] = useState(filterOpen)

  const handlePagination = () => {
    // console.log("invoicelist paginate", invoiceList)
    const filteredClients = invoiceList.filter((invoice) => {
      const matchesClient = invoice.client
        ?.toLowerCase()
        .includes(searchKeyword.toLowerCase());

      const matchesInvoiceNumber =
        invNumber === null || invoice.number?.includes(invNumber);

      const matchesBrand =
        searchBrand === "all" ||
        (invoice.brand === "lumiere" && searchBrand === "lumiere") ||
        (searchBrand === "glambyree" &&
          (!invoice.brand || invoice.brand === "glambyree"));

      const matchesPaymentStatus =
        searchStatus === "all" ||
        (invoice.paid === true && searchStatus === "true") ||
        (searchStatus === "false" && invoice.paid === false);

      //  console.log({
      //    invoiceBrand: invoice.brand,
      //    searching: searchBrand,
      //    matchesBrand,
      //  });
      const matchesDateRange =
        (!startDate || new Date(invoice.invoiceDate) >= new Date(startDate)) &&
        (!endDate || new Date(invoice.invoiceDate) <= new Date(endDate));

      return (
        matchesClient &&
        matchesInvoiceNumber &&
        matchesBrand &&
        matchesDateRange &&
        matchesPaymentStatus
      );
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
    } else {
      setCurrentPage(currentPage - 1);
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
  }, [searchKeyword, invNumber, searchBrand, startDate, endDate, searchStatus]);

  useEffect(() => {
    handlePagination();
    // console.log("list", paginatedList);
  }, [
    currentPage,
    invoiceList,
    searchKeyword,
    invNumber,
    searchBrand,
    startDate,
    endDate,
    searchStatus,
  ]);

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

  useEffect(() => {
    // Recalculate totals after invoiceList is updated
    if (invoiceList.length > 0) {
      const paidInvoices = invoiceList.filter((invoice) => invoice.paid);
      const paidGlambyreeInvoices = invoiceList.filter(
        (invoice) =>
          invoice.paid && (invoice.brand === "glambyree" || !invoice.brand)
      );
      const paidLumiereInvoices = invoiceList.filter(
        (invoice) =>
          invoice.paid && invoice.brand === "lumiere" 
      );
      const totalLumiereInv = invoiceList.filter(
        (invoice) => invoice.brand === "lumiere"
      );const totalGlambyreeInv = invoiceList.filter(
        (invoice) => invoice.brand === "glambyree" || !invoice.brand
      );



      setTotalInvoice(invoiceList.length)
      setTotalGlambyreeInvoices(totalGlambyreeInv.length);
      setTotalLumiereInvoices(totalLumiereInv.length)
      setInvPaid(paidInvoices.length);
      setGlambyreeInvPaid(paidGlambyreeInvoices.length);
      setLumiereInvPaid(paidLumiereInvoices.length);

      const totalPaidAmount = paidInvoices.reduce(
        (acc, invoice) => acc + invoice.total,
        0
      );
      const totalPaidGlambyreeAmount = paidGlambyreeInvoices.reduce(
        (acc, invoice) => acc + invoice.total,
        0
      ); const totalPaidLumiereAmount = paidLumiereInvoices.reduce(
        (acc, invoice) => acc + invoice.total,
        0
      );


      setAmountPaid(totalPaidAmount);
      setGlambyreeAmountPaid(totalPaidGlambyreeAmount);
      setLumiereAmountPaid(totalPaidLumiereAmount)

      
      
    }
  }, [invoiceList]);

  const handleUpdatePaidStatus = (invNumber) => {
    // Update the paid status of the invoice
    InvoiceList.updateInvoicePaidStatus("invoiceList", invNumber);

    // After updating, refetch the invoice list and recalculate totals
    handleFetchInvoiceList();
  };

  const handleResetFilters = () => {
    setSearchKeyword("");
    setInvNumber(null);
    setSearchBrand("all");
    setStartDate("");
    setEndDate("");
    // setFilterOpen(false);
  };
  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [filterOpen]);

  return (
    <div
      onClick={() => {
        setFilterOpen(false);
      }}
      className='flex flex-col gap-8 py-4 px-3 min-h-screen'
    >
      <div className='relative flex justify-between'>
        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          title="payment details"
          className='btn-primary  font-bold  shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-5px_10px_rgba(255,255,255,0.2)] hover:bg-background-secondary   w-fit px-2 border-b-2 border-b-button   rounded-lg py-1'
        >
          <i className='fa-solid fa-circle-info'></i>{" "}
        </button>
        <div className='flex gap-4 justify-between '>
          <button
            onClick={handleNavigateToCreateInvoice}
            title="create new"
            className='btn-primary  font-bold  shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-5px_10px_rgba(255,255,255,0.2)] hover:bg-background-secondary   w-fit px-2 border-b-2 border-b-button  rounded-lg py-1'
          >
            <i className='fa-solid fa-plus'></i>{" "}
          </button>
          <button
            onClick={(e) => {
              setFilterOpen(!filterOpen), e.stopPropagation();
            }}
            title="filters"
            className='btn-primary  font-bold  shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-5px_10px_rgba(255,255,255,0.2)] hover:bg-background-secondary   w-fit px-2 border-b-2 border-b-button   rounded-lg py-1'
          >
            {!filterOpen && <i className='fa-solid fa-filter'></i>}
            {filterOpen && <i className='fa-solid fa-ban'></i>}
          </button>
        </div>
        {filterOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className='right-0 top-full absolute w-[70%]  bg-background p-4 gap-3  text-sm   rounded-lg font-normal items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.8)]  transition-transform duration-300 px-4 py-6'
          >
            {/* <div className='flex z-34 w-full h-full items-center justify-center'> */}
            {/* <div
              onClick={(e) => e.stopPropagation()}
              className='fixed text-sm w-[80%]  rounded-lg font-normal items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.8)] bg-background  transition-transform duration-300 px-4 py-6'
            > */}
            {/* <div className=' mx-auto flex flex-col gap-3 '> */}
            <div className='flex justify-end'>
              <button
                onClick={handleResetFilters}
                className='btn-primary  font-bold  shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-5px_10px_rgba(255,255,255,0.2)] hover:bg-background-secondary   w-fit px-2 border-b-2 border-b-button  rounded-lg py-1'
              >
                <i className='fa-solid fa-arrow-rotate-left'></i>
              </button>
            </div>
            <div className=' flex flex-col gap-3 '>
              <div className='flex flex-col'>
                {" "}
                <label className='font-'>Client's name</label>{" "}
                <input
                  type='text'
                  className='input-field   text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                  // placeholder='Search...'
                  onChange={(e) => setSearchKeyword(e.target.value)}
                ></input>
              </div>
              <div className='flex flex-col'>
                {" "}
                <label className='font-'>Invoice number</label>
                <input
                  className='input-field   text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                  type='text'
                  // placeholder='Search...'
                  onChange={(e) => setInvNumber(e.target.value)}
                ></input>
              </div>
              <div className='flex gap-2 w-full justify-between '>
                <div className='flex w-[48%]  flex-col'>
                  {" "}
                  <label className='font-'>Payment status</label>
                  <select
                    className='input-field   text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                  >
                    <option value={"all"}>All</option>
                    <option value={"true"}>Paid</option>
                    <option value={"false"}>Unpaid</option>
                  </select>
                </div>
                <div className='flex w-[48%] flex-col'>
                  {" "}
                  <label className='font-'>Brand</label>
                  <select
                    className='input-field   text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                    value={searchBrand}
                    onChange={(e) => setSearchBrand(e.target.value)}
                  >
                    <option value={"all"}>All</option>
                    <option value={"glambyree"}>Glambyree</option>
                    <option value={"lumiere"}>Lumiere</option>
                  </select>
                </div>
              </div>
              <div className='flex gap-2 w-full justify-between '>
                <div className='flex flex-col w-[48%]'>
                  {" "}
                  <label className='font-'>From</label>
                  <input
                    type='date'
                    value={startDate}
                    placeholder='Start date'
                    onChange={(e) => setStartDate(e.target.value)}
                    className='input-field   text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                  />
                </div>
                <div className='flex flex-col w-[48%]'>
                  {" "}
                  <label className='font-'>To</label>
                  <input
                    type='date'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className='input-field   text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  bg-input-background w-full rounded focus:outline-none shadow-[0px_2px_6px_rgba(0,0,0,0.1),0px_-2px_6px_rgba(0,0,0,0.05)] border-b-2 border-b-input-border  hover:border-b-0 px-2 py-1'
                  />
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div>
            </div>{" "} */}
          </div>
        )}
        {detailsOpen && (
          <div
            onClick={() => {
              setDetailsOpen(false);
            }}
            className={`fixed flex items-center justify-center w-full min-h-screen inset-0  z-30  bg-black/20 p-4 border-button  rounded-br  gap-3 `}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className='fixed flex flex-col z-34  items-center rounded-lg justify-center shadow-[0_4px_10px_rgba(0,0,0,0.8)] bg-background  transition-transform duration-300 px-4 py-6 w-[80%] '
            >
              <div className='flex flex-col text-sm   rounded-lg font-normal '>
                {" "}
                <div className='grid grid-cols-3 gap-4 text-center border-b pb-2'>
                  <p className='flex flex-col'>
                    <b>Total:</b> {totalInvoices}
                  </p>
                  <p className='flex flex-col'>
                    <b>Total Invoices Paid:</b> {invPaid}
                  </p>
                  <p className='flex flex-col'>
                    <b>Total Amount Paid:</b> ₦{" "}
                    {formatNumberWithCommas(amountPaid)}.00
                  </p>
                </div>
                <div className='grid grid-cols-3 gap-4 text-center border-b py-2'>
                  <p className='flex flex-col'>
                    <b>Total Invoices (Glambyree):</b> {totalGlambyreeInvoices}
                  </p>
                  <p className='flex flex-col'>
                    <b>Total Invoices Paid:</b> {glambyreeInvPaid}
                  </p>
                  <p className='flex flex-col'>
                    <b>Total Amount Paid:</b> ₦{" "}
                    {formatNumberWithCommas(glambyreeAmountPaid)}.00
                  </p>
                </div>
                <div className='grid grid-cols-3 gap-4 text-center pt-2'>
                  <p className='flex flex-col'>
                    <b>Total Invoices (Lumière):</b> {totalLumiereInvoices}
                  </p>
                  <p className='flex flex-col'>
                    <b>Total Invoices Paid:</b> {lumiereInvPaid}
                  </p>
                  <p className='flex flex-col'>
                    <b>Total Amount Paid:</b> ₦{" "}
                    {formatNumberWithCommas(lumiereAmountPaid)}.00
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setDetailsOpen(false);
                }}
                className='btn-primary  font-bold  shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-5px_10px_rgba(255,255,255,0.2)] hover:bg-background-secondary   w-fit px-2 border-b-2 border-b-button   rounded-lg py-1'
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <ul className='flex flex-col    gap-4'>
        {paginatedList.map((item, index) => (
          <li
            key={index}
            className='bg-input-border border-b-2 py-2 border-b-button-hover shadow-[0_5px_10px_rgba(0,0,0,0.15),0_-5px_10px_rgba(255,255,255,0.2)] hover:bg-background-secondary flex gap-2 flex-col items-center   w-[80%]  mx-auto rounded-lg '
          >
            {" "}
            <NavLink
              to={`/${item.invNumber}`}
              className=' flex flex-col z-2 items-center  w-full gap-2'

              // className=' text-button hover:text-button-hover px-2 py-1 rounded-lg hover:border-button-hover'
            >
              <div className='flex flex-col gap-2   w-full px-3 justify-between'>
                <div className='flex w-full justify-between'>
                  <p>#{item.invNumber}</p>
                  <span className='font-dancing text-lg font-extrabold'>
                    {(item.brand === "glambyree" || !item.brand) && (
                      <span>Glambyree</span>
                    )}{" "}
                    {item.brand === "lumiere" && <span>Lumière</span>}{" "}
                  </span>{" "}
                </div>
                <div className='flex justify-between'>
                  <div className='w-full'>
                    <p className='font-bold'>#{item.invoiceDate}</p>
                    <button
                      onClick={(e) => {
                        handleUpdatePaidStatus(item.invNumber);
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                      className={`font-regular hover:bg-button z-10 font-extrabold  text-xs shadow-customDark   w-fit px-1  rounded-lg
                      ${
                        item.paid
                          ? "bg-button-paid text-text-paid"
                          : "bg-button-sent text-text-sent "
                      } 
                      `}
                    >
                      {item.paid ? "Paid" : "Sent"}
                    </button>{" "}
                  </div>
                  <div className='flex flex-col items-end  w-full justify-between'>
                    <p className='flex font-[900] text-xl items-center'>
                      ₦ {formatNumberWithCommas(item.total)}
                    </p>
                    <p className=' text-sm '>{item.client}</p>
                  </div>
                </div>
              </div>
            </NavLink>
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
