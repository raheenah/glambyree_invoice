



export default class InvoiceList {
    static addInvoice(key, value) {
    const    currentInvoiceList = JSON.parse(localStorage.getItem(key)) || [];
        const updatedInvoiceList = [...currentInvoiceList, value];
        localStorage.setItem(key, JSON.stringify(updatedInvoiceList));
    }
    static getInvoiceList(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}
