import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load the header and footer
loadHeaderFooter();

// Initialize the ShoppingCart instance
const cart = new ShoppingCart("so-cart", "#cart-items");
// Render the cart elements
cart.renderCartElements();

// Add a sample item to the cart for testing (optional, remove after testing)
const sampleItem = {
  Id: "123",
  Name: "Tent",
  Images: { PrimarySmall: "/images/tent.jpg" },
  Colors: [{ ColorName: "Blue" }],
  FinalPrice: 99.99,
};

cart.addToCart(sampleItem);
// import ShoppingCart from "./ShoppingCart.mjs";
// import { loadHeaderFooter } from "./utils.mjs";

// loadHeaderFooter();

// const shoppingCart = new ShoppingCart("so-cart", ".product-list");
// shoppingCart.renderCartElements();
// import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// function deleteFromCartHandler(e) {
//   // Pull the index of the item to be removed from the button's data-index attribute
//   const itemIndex = e.target.dataset.index;
//   console.log(`Deleting item at index: ${itemIndex}`);

//   const currentCart = getLocalStorage("so-cart");
//   currentCart.splice(itemIndex, 1); // Remove the item at the specified index
//   setLocalStorage("so-cart", currentCart); // Update the cart in local storage
//   renderCartContents(); // Re-render the cart contents
// }

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart") || [];

//   if (cartItems.length === 0) {
//     alert("Your cart is empty.");
//     return;
//   }

//   const htmlItems = cartItems.map((item, index) =>
//     cartItemTemplate(item, index),
//   );
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");

//   document.querySelectorAll(".delete-button").forEach((button) => {
//     console.log(
//       `Attaching event listener to delete button with index: ${button.dataset.index}`,
//     ); // Debugging: Log the button index
//     button.addEventListener("click", deleteFromCartHandler);
//   });
// }

// function cartItemTemplate(item, index) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
//   <span class="delete-button" data-index="${index}" style="color: red; cursor: pointer;">X</span>
// </li>`;

//   console.log(`Rendering item with index: ${index}`);
//   return newItem;
// }

// renderCartContents();