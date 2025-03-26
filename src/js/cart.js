// filepath: c:\Users\UtahH\OneDrive\Desktop\WDD330.002\src\js\cart.js
import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cartElement = document.querySelector(".product-list");const cart = new ShoppingCart("so-cart", cartElement);
cart.renderCartElements();