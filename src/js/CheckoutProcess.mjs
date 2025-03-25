import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import Alert from "./Alert";

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
    this.shipping = parseInt(((this.list.reduce((sum, item) => sum + item.Quantity, 0) - 1) * 2) + 10);
    this.total = parseFloat(this.itemTotal + this.tax + this.shipping);
    this.displayTotal();
  }

  displayTotal = () => {
    document.getElementById("tax").innerText = "$" + this.tax.toFixed(2);
    document.getElementById("shipping").innerText = "$" + (this.shipping).toFixed(2);
    document.getElementById("orderTotal").innerText = "$" + (this.total).toFixed(2);
  }

  packageItems = () => {
    const items = this.list.map(item => {
      return {
        "id": item.Id,
        "name": item.Name,
        "price": item.FinalPrice,
        "quantity": item.Quantity
      }
    });
    return items;
  }

  checkout = async (form) => {
    const formData = new FormData(form);
    let json = {};
    formData.forEach((value, key) => {
      json[key] = value;
    })
    json["orderDate"] = new Date().toISOString();
    json["items"] = this.packageItems();
    json["orderTotal"] = toString(this.total.toFixed(2));
    json["shipping"] = this.shipping;
    json["tax"] = toString(this.tax.toFixed(2));
    try {
      const externalServices = new ExternalServices();
      const response = await externalServices.postData(json);
      if (response.message === "Order Placed") {
        setLocalStorage("so-cart", []);
        location.assign(`/checkout/success.html?orderId=${response.orderId}`);
      }
    } catch (error) {
      let errors = []
      for (let message in error.message) {
        errors.push({
          "message": error.message[message],
          "background": "orange",
          "color": "black"
        })
      }
      const alertObject =  new Alert(errors);
      alertObject.createAlert();
    }
  }
}