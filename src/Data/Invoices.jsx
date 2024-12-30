



export default class InvoiceList {
    static addInvoice(key, value) {
    const    currentInvoiceList = JSON.parse(localStorage.getItem(key)) || [];
        const updatedInvoiceList = [...currentInvoiceList, value];
        localStorage.setItem(key, JSON.stringify(updatedInvoiceList));
    }
    static getInvoiceList(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    static getInvoiceDetails(key, invToFetch) {
        const invList = JSON.parse(localStorage.getItem(key)) || [];
        if (invToFetch <= 0) {
            return null;
        }
        else {
                    console.log(invList, "invlist");

        const details = invList.find((inv) => inv.invNumber === invToFetch);
            console.log(details, "detasl")
            return details;
        }
    }
}
