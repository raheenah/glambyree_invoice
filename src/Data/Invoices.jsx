



export default class InvoiceList {
  static addInvoice(key, value) {
    // console.log("adding to list...")
    const currentInvoiceList = JSON.parse(localStorage.getItem(key)) || [];
    // console.log(currentInvoiceList,"currentinlist")
    const updatedInvoiceList = [...currentInvoiceList, value];
    localStorage.setItem(key, JSON.stringify(updatedInvoiceList));
    // console.log(updatedInvoiceList,"updatedinvlist")
  }
  static getInvoiceList(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  static getInvoiceDetails(key, invToFetch) {
    const invList = JSON.parse(localStorage.getItem(key)) || [];
    if (invToFetch <= 0) {
      return null;
    } else {
    //   console.log(invList, "invlist");

      const details = invList.find((inv) => inv.invNumber === invToFetch);
    //   console.log(details, "detasl");
      return details;
    }
  }

  static updateInvoicePaidStatus(key, invNumber) {
      const invList = JSON.parse(localStorage.getItem(key)) || [];
    //   console.log("key", key)
    //   console.log(invList,"invlist")
    const updatedInvList = invList.map((inv) => {
      if (inv.invNumber === invNumber) {
          return { ...inv, paid: !inv.paid };
      }
      return inv; // Return other invoices unchanged
    });

      localStorage.setItem(key, JSON.stringify(updatedInvList)) 
    //   console.log(updatedInvList,"updatedinlist")
  }
}
