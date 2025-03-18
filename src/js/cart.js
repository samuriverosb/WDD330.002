import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const shoppingCart = new ShoppingCart("so-cart", ".product-list");
shoppingCart.renderCartElements();