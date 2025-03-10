import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

const getCurrentCart = () => Array.isArray(getLocalStorage("so-cart")) ? getLocalStorage("so-cart") : [];

function addProductToCart(product) {
<<<<<<< HEAD
  let cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
  alert("Product added to cart");
=======
  setLocalStorage("so-cart", [...getCurrentCart(), product]);
>>>>>>> main
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
