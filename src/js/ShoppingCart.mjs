import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const cartItemTemplate = (item, index) => {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images?.PrimarySmall || "/images/placeholder.png"}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No color specified"}</p>
    <p class="cart-card__quantity">Quantity: ${item.Quantity}</p>
    <p class="cart-card__price">Price: $${(item.FinalPrice * item.Quantity).toFixed(2)}</p>
    <span class="delete-button" data-index="${index}" style="color: red; cursor: pointer;">X</span>
  </li>`;
};

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;

    // Update the cart icon item count on initialization
    this.renderCartElements();
  }

  renderCartElements = () => {
    const parentElement = document.querySelector(this.parentSelector);
    if (!parentElement) {
      console.error(`Element with selector "${this.parentSelector}" not found.`);
      return;
    }

    const cartElements = getLocalStorage(this.key) || [];
    const htmlElements = cartElements.map((element, index) => cartItemTemplate(element, index));
    parentElement.innerHTML = htmlElements.join("");

    // Calculate total items in the cart
    const totalItems = cartElements.reduce((sum, item) => sum + item.Quantity, 0);

    // Store total items in local storage
    setLocalStorage("totalItemsInCart", totalItems);

    // Update the cart icon item count
    const cartCountElement = document.querySelector("#totalItemsInCart");
    if (cartCountElement) {
      cartCountElement.innerText = totalItems;
    }

    // Show or hide the cart footer based on cart contents
    const cartFooter = document.querySelector(".list-footer");
    if (cartElements.length > 0) {
      cartFooter?.classList.remove("hide");

      // Calculate total price
      const totalPrice = cartElements.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);

      // Update the total price in the footer
      const totalElement = document.querySelector(".list-total");
      if (totalElement) {
        totalElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
      }
    } else {
      cartFooter?.classList.add("hide");
      parentElement.innerHTML = "<p>Your cart is empty.</p>";
    }

    // Add event listeners for delete buttons
    this.attachDeleteListeners();
  };

  attachDeleteListeners = () => {
    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemIndex = e.target.dataset.index;

        const currentCart = getLocalStorage(this.key);
        currentCart.splice(itemIndex, 1); // Remove the item
        setLocalStorage(this.key, currentCart); // Update local storage

        // Update total items in local storage
        const totalItems = currentCart.reduce((sum, item) => sum + item.Quantity, 0);
        setLocalStorage("totalItemsInCart", totalItems);

        // Re-render the cart and update the header/footer
        this.renderCartElements();
      });
    });
  };
}