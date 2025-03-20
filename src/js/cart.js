import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Load the header and footer
loadHeaderFooter();

// Initialize the ShoppingCart class
const cart = new ShoppingCart("so-cart", ".product-list");

// Render the cart contents
cart.renderCartElements();