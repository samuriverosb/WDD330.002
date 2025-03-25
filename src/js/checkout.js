import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const cartItemTemplate = (item, index) => {
  const imageUrl = item.Images?.PrimarySmall || "../images/camping-products.png";
  const colorName = item.Colors?.[0]?.ColorName || "No color specified";
  const price = item.FinalPrice ? (item.FinalPrice * item.Quantity).toFixed(2) : "0.00";
  const quantity = item.Quantity ? item.Quantity : 1;

  return `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${imageUrl}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">$${price}</p>
    <span class="delete-button" data-index="${index}" style="color: red; cursor: pointer;">X</span>
  </li>`;
};

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartElements = () => {
    const parentElement = document.querySelector(this.parentSelector);

    const cartElements = getLocalStorage(this.key) || [];
    const htmlElements = cartElements.map((element, index) => cartItemTemplate(element, index));
    parentElement.innerHTML = htmlElements.join("");

    const cartFooter = document.querySelector("#cartFooter");
    if (cartElements.length > 0) {
      cartFooter.classList.remove("hide");
      const total = cartElements.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
      document.querySelector("#cartTotal").innerText = `$${total.toFixed(2)}`;
    } else {
      cartFooter.classList.add("hide");
      parentElement.innerHTML = "<p>Your cart is empty.</p>";
    }

    // Add event listeners for the delete buttons
    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemIndex = e.target.dataset.index;

        // Get the current cart from local storage
        const currentCart = getLocalStorage(this.key);

        // Decrease the quantity of the item
        if (currentCart[itemIndex].Quantity > 1) {
          currentCart[itemIndex].Quantity -= 1;
        } else {
          // If the quantity is 1, remove the item from the cart
          currentCart.splice(itemIndex, 1);
        }

        // Update local storage with the modified cart
        setLocalStorage(this.key, currentCart);

        // Re-render the cart
        this.renderCartElements();
      });
    });
  };

  addToCart = (item) => {
    const currentCart = getLocalStorage(this.key) || [];

    if (!item.Quantity || isNaN(item.Quantity)) {
      item.Quantity = 1;
    }

    // Check if the item is already in the cart
    const existingItem = currentCart.find((cartItem) => cartItem.Id === item.Id);

    if (existingItem) {
      existingItem.Quantity += item.Quantity;
    } else {
      currentCart.push(item);
    }

    setLocalStorage(this.key, currentCart);
    this.renderCartElements();
  };
}