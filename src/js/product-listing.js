import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

// Get the category from the URL
const category = getParam("category") || "default-category";

// Update the page title dynamically
const categoryTitle = document.querySelector("#category-title");
if (categoryTitle) {
  categoryTitle.innerText =
    category === "default-category"
      ? "Top Products: Unknown Category"
      : `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
} else {
  console.error('Element with selector "#category-title" not found. Unable to update the page title.');
}

// Initialize the product list
const listElement = document.querySelector("#top-products");
if (listElement) {
  const dataSource = new ProductData();
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
} else {
  console.error('Element with selector "#top-products" not found. Unable to render the product list.');
}