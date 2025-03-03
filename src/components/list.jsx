import { useEffect, useState } from "react";
import InvoiceList from "../Data/Invoices";
import { NavLink, useNavigate } from "react-router-dom";
// import { list } from "postcss";

const HomePage = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const navigate = useNavigate();
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedList, setPaginatedList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [invNumber, setInvNumber] = useState(null);
  const [amountPaid, setAmountPaid] = useState(0);
  const [invPaid, setInvPaid] = useState(null);
  const [searchBrand, setSearchBrand] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchStatus, setSearchStatus] = useState("all")


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

      return matchesClient && matchesInvoiceNumber && matchesBrand && matchesDateRange && matchesPaymentStatus;
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
  }, [currentPage, invoiceList, searchKeyword, invNumber, searchBrand, startDate, endDate, searchStatus]);

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
      setInvPaid(paidInvoices.length);

      const totalPaidAmount = paidInvoices.reduce(
        (acc, invoice) => acc + invoice.total,
        0
      );
      setAmountPaid(totalPaidAmount);
    }
  }, [invoiceList]);

  const handleUpdatePaidStatus = (invNumber) => {
    // Update the paid status of the invoice
    InvoiceList.updateInvoicePaidStatus("invoiceList", invNumber);

    // After updating, refetch the invoice list and recalculate totals
    handleFetchInvoiceList();
  };

  const handleResetFilters = () => {
    setSearchKeyword("")
    setInvNumber(null)
    setSearchBrand("all")
    setStartDate("")
    setEndDate("")
    setFilterOpen(false)
  }

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
      <div className='relative'>
        <div className='flex justify-between '>
          <button
            onClick={handleNavigateToCreateInvoice}
            className='border-2 border-button text-button hover:text-button-hover px-2 py-1 rounded-lg hover:border-button-hover'
          >
            <i className='fa-solid fa-plus'></i>{" "}
          </button>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className='border-2 border-button text-button hover:text-button-hover px-2 py-1 rounded-lg hover:border-button-hover'
          >
            {!filterOpen && <i className='fa-solid fa-filter'></i>}
            {filterOpen && <i className='fa-solid fa-ban'></i>}
          </button>
        </div>
        {filterOpen && (
          <div className='right-0 absolute w-[70%]  bg-background p-4 border-button border-x-2 border-b-2 rounded-bl rounded-br justify-between gap-3 '>
            <div className='flex justify-end'>
              <button
                onClick={handleResetFilters}
                className='bg-button hover:bg-button-hover px-2 py-1 text-sm font-bold rounded'
              >
                Reset
              </button>
            </div>
            <div className=' flex flex-col gap-3 '>
              <div className='flex flex-col'>
                {" "}
                <label className='font-bold'>Client's name</label>{" "}
                <input
                  type='text'
                  className='border-2 placeholder:text-text  border-button bg-transparent  px-2 py-1 rounded w-full'
                  placeholder='Search...'
                  onChange={(e) => setSearchKeyword(e.target.value)}
                ></input>
              </div>
              <div className='flex flex-col'>
                {" "}
                <label className='font-bold'>Invoice number</label>
                <input
                  className='border-2 w-full placeholder:text-text border-button px-2 bg-transparent py-1 rounded'
                  type='text'
                  placeholder='Search...'
                  onChange={(e) => setInvNumber(e.target.value)}
                ></input>
              </div>

              <div className='flex flex-col'>
                {" "}
                <label className='font-bold'>Payment status</label>
                <select
                  className='border-2 w-full placeholder:text-text border-button px-2 bg-transparent py-1 rounded'
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                >
                  <option value={"all"}>All</option>
                  <option value={"true"}>Paid</option>
                  <option value={"false"}>Unpaid</option>
                </select>
              </div>
              <div className='flex flex-col'>
                {" "}
                <label className='font-bold'>Brand</label>
                <select
                  className='border-2 w-full placeholder:text-text border-button px-2 bg-transparent py-1 rounded'
                  value={searchBrand}
                  onChange={(e) => setSearchBrand(e.target.value)}
                >
                  <option value={"all"}>All</option>
                  <option value={"glambyree"}>Glambyree</option>
                  <option value={"lumiere"}>Lumiere</option>
                </select>
              </div>
              <div className='flex gap-2 w-full justify-between '>
                <div className='flex flex-col w-[48%]'>
                  {" "}
                  <label className='font-bold'>From</label>
                  <input
                    type='date'
                    value={startDate}
                    placeholder='Start date'
                    onChange={(e) => setStartDate(e.target.value)}
                    className='border-2 border-button px-2 bg-transparent py-1 rounded'
                  />
                </div>
                <div className='flex flex-col w-[48%]'>
                  {" "}
                  <label className='font-bold'>To</label>
                  <input
                    type='date'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className='border-2 border-button px-2 bg-transparent py-1 rounded'
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ul className='flex flex-col  gap-2'>
        {paginatedList.map((item, index) => (
          <li
            key={index}
            className='bg-table-row flex gap-2 flex-col items-center border-2 py-1 w-[70%] mx-auto rounded-lg border-table-border'
          >
            {" "}
            <NavLink
              to={`/${item.invNumber}`}
              className=' flex flex-col items-center  w-full gap-2'

              // className=' text-button hover:text-button-hover px-2 py-1 rounded-lg hover:border-button-hover'
            >
              <div className='flex gap-2 flex-col font-bold  w-full px-3 justify-between'>
                <div className=''>
                  <span>
                    {(item.brand === "glambyree" || !item.brand) && (
                      <span>Glambyree</span>
                    )}{" "}
                    - {item.brand === "lumiere" && <span>Lumière</span>}{" "}
                    {item.invoiceDate}
                  </span>
                </div>
                <div className='flex items-center font-normal w-full justify-between'>
                  <p className=' '>{item.client}</p>
                  <p className='flex items-center'>
                    ₦ {formatNumberWithCommas(item.total)}
                  </p>
                </div>
              </div>
            </NavLink>
            <button
              onClick={() => handleUpdatePaidStatus(item.invNumber)}
              className='bg-button hover:bg-button-hover font-bold px-2 py-1 mb-2 rounded'
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
