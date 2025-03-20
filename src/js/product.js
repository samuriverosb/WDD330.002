import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load the header and footer
loadHeaderFooter();

// Get the product ID from the URL
const productId = getParam("product");

// Initialize the ProductDetails class
const productDetails = new ProductDetails(productId);
productDetails.init();