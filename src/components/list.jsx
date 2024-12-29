import { useEffect, useState } from "react";
import InvoiceList from "../Data/Invoices";
import { useNavigate } from "react-router-dom";
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

  //   const handleSearchKeyword = () => {
  //     // const filterdInvoices = paginatedList.client

  //     const filteredClients = invoiceList.filter((todo) => {
  //       const matchesClient = invoiceList.title
  //         .toLowerCase()
  //         .includes(searchQuery.toLowerCase());

  //       const matchesInvoiceNumber = invoiceList.invnumber.includes(invNumber);

  //       return filteredClients && matchesInvoiceNumber;
  //     });
  //   };

  // useEffect(() => {
  //     handleSearchKeyword();

  // }, [searchQuery, currentPage])

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
    if (currentPage ) {
      setCurrentPage(currentPage - 1);
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
    <div>
      <h1>hjwiw</h1>
      <input
        type='text'
        placeholder='Search...'
        onChange={(e) => setSearchKeyword(e.target.value)}
      ></input>
      <input
        type='text'
        placeholder='inv no...'
        onChange={(e) => setInvNumber(e.target.value)}
      ></input>
      <button onClick={handleNavigateToCreateInvoice}>New Invoice</button>
      <ul>
        {paginatedList.map((item, index) => (
          <li key={index} className='bg-table-row'>
            <p className='w-1/2 py-2 pl-2'>{item.client}</p>
            <p> {item.number}</p>
            <p>{formatNumberWithCommas(item.total)}</p>
            <p>{item.invoiceDate}</p>
            {/* <p>{item.invoiceList.} </p> */}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)}>prev</button>
        <p>{currentPage}</p>
        <button onClick={() => setCurrentPage(currentPage + 1)}>next</button>
      </div>
    </div>
  );
};

export default HomePage;
