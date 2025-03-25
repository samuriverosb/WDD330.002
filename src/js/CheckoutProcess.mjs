import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key) {
    this.key = key;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.total = 0;
  }

  init = () => {
    this.list = getLocalStorage(this.key);
    this.calculateSubtotal();
  }

  calculateSubtotal = () => {
    this.itemTotal = parseFloat((this.list.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0)).toFixed(2));
    document.getElementById("cartTotal").innerText = "$" + this.itemTotal;
  }

  calculateTotal = () => {
    this.tax = parseFloat(this.itemTotal * .06);
    this.shipping = parseFloat(((this.list.reduce((sum, item) => sum + item.Quantity, 0) - 1) * 2) + 10);
    this.total = parseFloat(this.itemTotal + this.tax + this.shipping);
    this.displayTotal();
  }

  displayTotal = () => {
    document.getElementById("tax").innerText = "$" + this.tax.toFixed(2);
    document.getElementById("shipping").innerText = "$" + (this.shipping).toFixed(2);
    document.getElementById("orderTotal").innerText = "$" + (this.total).toFixed(2);
  }
}