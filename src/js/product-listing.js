import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
myList.init();

document.getElementById("modalClose").onclick = () => {
  document.getElementById("modal").classList.add("hide");
}