export default class Invoice {
  // static initialize(startNumber = 54) {
  //  try {
  //    const currentInvoice = localStorage.getItem("currentInvoiceNumber");
  //    if (!currentInvoice) {
  //      localStorage.setItem("currentInvoiceNumber", startNumber);
  //    }
  //  } catch (error) {
  //    console.error("Failed to initialize the invoice system:", error);
  //  }
  
  // }

  static getLastInvoiceNumber(key) {
     try {
       const currentInvoice = localStorage.getItem("currentInvoiceNumber") || 65;
      //  console.log("gotten currentinvoice", currentInvoice)
       return parseInt(currentInvoice, 10);
     } catch (error) {
       console.error("Failed to retrieve the current invoice number:", error);
       return null;
     }
  }

  static setLastInvoiceNumber(key, value) {
    try {
     localStorage.setItem(key, value);
    } catch (error) {
      console.error("Failed to set item in localStorage:", error);
    }
  }
}
