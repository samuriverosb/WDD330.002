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

if (category) {
  setTimeout(() => {
    const breadcrumbs = document.getElementById("breadcrumbs");
    const itemCount = listElement.children.length;
    breadcrumbs.textContent = `${category} -> (${itemCount} items)`;

    breadcrumbs.style.padding = "10px";
    breadcrumbs.style.backgroundColor = "#f8f8f8";
    breadcrumbs.style.fontWeight = "bold";
  }, 500);
}

document.getElementById("modalClose").onclick = () => {
  document.getElementById("modal").classList.add("hide");
}