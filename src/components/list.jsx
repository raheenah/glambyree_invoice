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

    

  const handlePagination = () => {
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, invNumber]);

  useEffect(() => {
    handlePagination();
  }, [currentPage, invoiceList, searchKeyword, invNumber]);

  const handleFetchInvoiceList = () => {
    const list = InvoiceList.getInvoiceList("invoiceList");
    setInvoiceList(list);
    console.log(list, "invoicelist");
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

  return (
    <div className='flex flex-col gap-3 px-3 min-h-screen'>
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
            <div className="flex font-bold items-center w-full px-3 justify-between">
              <p className='w-full py-2  pl-2'>{item.client}</p>
              <p className='font-bold p-2'> {item.invNumber}</p>
            </div>
            {/* <p>{formatNumberWithCommas(item.total)}</p> */}
            {/* <p>{item.invoiceDate}</p> */}
            <ul className='pl-4 max-h-32 overflow-y-auto'>
              {item.invoiceList.map((invoiceItem, invoiceIndex) => (
                <li
                  key={invoiceIndex}
                  className='flex justify-between border-b py-1'
                >
                  <span>{invoiceItem.item}</span>
                </li>
              ))}
            </ul>
            <NavLink
              to={`/${item.invNumber}`}
              className=' text-button hover:text-button-hover px-2 py-1 rounded-lg hover:border-button-hover'
            >
              <i className='fa-solid fa-arrow-up-right-from-square'></i>
            </NavLink>
            {/* <p>{item.invoiceList.} </p> */}
          </li>
        ))}
      </ul>
      <div className='flex gap-4 items-center w-fit mx-auto py-3'>
        <button
          className='border-2 border-button text-button hover:text-button-hover px-2 py-1 rounded-lg hover:border-button-hover'
          onClick={handlePreviousButtton}
        >
          <i className='fa-solid fa-arrow-left'></i>
        </button>
        <p>{currentPage}</p>
        <button
          className='border-2 border-button text-button hover:text-button-hover px-2 py-1 rounded-lg hover:border-button-hover'
          onClick={handleNextButton}
        >
          <i className='fa-solid fa-arrow-right'></i>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
