// ShoppingCart.mjs
// This file is responsible for managing the shopping cart. It handles:
// Rendering Cart Items:
// The renderCartElements method dynamically generates HTML for each item in the cart and displays it in the specified parent element.
// It also adds event listeners to delete buttons to allow users to remove items from the cart.
// Adding Items to the Cart:
// The addToCart method adds a product to the cart. If the product already exists, it increments the quantity; otherwise, it adds the product with a quantity of 1.
// Local Storage Integration:
// The cart data is stored in and retrieved from local storage using getLocalStorage and setLocalStorage from utils.mjs.


import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const cartItemTemplate = (item, index) => {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="delete-button" data-index="${index}" style="color: red; cursor: pointer;">X</span>
  </li>`;
};

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartElements = () => {
    const cartElements = getLocalStorage(this.key) || [];
    const htmlElements = cartElements.map((element, index) => cartItemTemplate(element, index));
    document.querySelector(this.parentSelector).innerHTML = htmlElements.join("");

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemIndex = e.target.dataset.index;

        const currentCart = getLocalStorage(this.key);
        currentCart.splice(itemIndex, 1); // Remove the item
        setLocalStorage(this.key, currentCart); // Update local storage
        this.renderCartElements(); // Re-render the cart
      });
    });

    if (cartElements.length === 0) {
      alert("Your cart is empty.");
    }
  };

  addToCart = (item) => {
    const currentCart = getLocalStorage(this.key) || [];

    // Check if the item is already in the cart
    const existingItem = currentCart.find((cartItem) => cartItem.Id === item.Id);

    if (existingItem) {
      // If the item exists, increment the quantity
      existingItem.Quantity += 1;
    } else {
      // If the item does not exist, add it to the cart with a quantity of 1
      item.Quantity = 1;
      currentCart.push(item);
    }

    // Save the updated cart to local storage
    setLocalStorage(this.key, currentCart);

    // Re-render the cart
    this.renderCartElements();
  };
}