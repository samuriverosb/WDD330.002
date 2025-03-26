import ProductData from "./ProductData.js";
import ProductList from "./ProductList.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";

// Load the header and footer
loadHeaderFooter();

// Get the category from the query string
const category = getParam("category");

// Create an instance of the ProductData class
const dataSource = new ProductData();

// Get the element where the product list will be rendered
const listElement = document.querySelector(".product-list");

// Create an instance of the ProductList class and initialize it
const productList = new ProductList(category, dataSource, listElement);
productList.init();