import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

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
  constructor(key, parentElement) {
    this.key = key;
    this.parentElement = parentElement;
    this.cartItems = getLocalStorage(this.key) || [];
  }

  renderCartElements = () => {
    const cartElements = getLocalStorage(this.key) || [];
  
    // Handle empty cart
    if (cartElements.length === 0) {
      this.parentElement.innerHTML = "<p>Your cart is empty.</p>";
      document.getElementById("list-total-items").innerText = `Items: 0`;
      document.getElementById("list-total").innerText = `Total: $0.00`;
  
      // Hide the totals section
      document.querySelector(".list-footer").classList.add("hide");
      return;
    }
  
    // Render cart items
    const htmlElements = cartElements.map((element, index) => cartItemTemplate(element, index));
    this.parentElement.innerHTML = htmlElements.join("");
  
    // Calculate totals
    const totalItems = cartElements.reduce((sum, item) => sum + item.Quantity, 0);
    const totalPrice = cartElements.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
  
    // Update totals in the DOM
    document.getElementById("list-total-items").innerText = `Items: ${totalItems}`;
    document.getElementById("list-total").innerText = `Total: $${totalPrice.toFixed(2)}`;
  
    // Show the totals section
    document.querySelector(".list-footer").classList.remove("hide");
  
    // Add event listeners for delete buttons
    this.addDeleteEventListeners(cartElements);
  };

  addDeleteEventListeners = (cartElements) => {
    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemIndex = e.target.dataset.index;

        // Update cart in localStorage
        if (cartElements[itemIndex].Quantity === 1) {
          cartElements.splice(itemIndex, 1); // Remove item if quantity is 1
        } else {
          cartElements[itemIndex].Quantity--; // Decrease quantity
        }

        // Save updated cart to localStorage
        setLocalStorage(this.key, cartElements);

        // Re-render cart
        this.renderCartElements();
      });
    });
  };
}