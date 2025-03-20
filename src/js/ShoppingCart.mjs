import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const cartItemTemplate = (item, index) => {
    // Use a placeholder image if PrimarySmall is missing
    const imageUrl = item.Images?.PrimarySmall || "/images/placeholder.png";
    const colorName = item.Colors?.[0]?.ColorName || "No color specified";
  
    return `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${imageUrl}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${colorName}</p>
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
    const parentElement = document.querySelector(this.parentSelector);
    if (!parentElement) {
      console.error(`Element with selector "${this.parentSelector}" not found.`);
      return;
    }
  
    const cartElements = getLocalStorage(this.key) || [];
    const htmlElements = cartElements.map((element, index) => cartItemTemplate(element, index));
    parentElement.innerHTML = htmlElements.join("");
  
    // Show or hide the cart footer based on cart contents
    const cartFooter = document.querySelector("#cartFooter");
    if (cartElements.length > 0) {
      cartFooter.classList.remove("hide");
      const total = cartElements.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
      document.querySelector("#cartTotal").innerText = `$${total.toFixed(2)}`;
    } else {
      cartFooter.classList.add("hide");
      alert("Your cart is empty.");
    }
  
    // Add event listeners for delete buttons
    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemIndex = e.target.dataset.index;
  
        const currentCart = getLocalStorage(this.key);
        currentCart.splice(itemIndex, 1); // Remove the item
        setLocalStorage(this.key, currentCart); // Update local storage
        this.renderCartElements(); // Re-render the cart
      });
    });
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
  
    // Update local storage
    setLocalStorage(this.key, currentCart);
  
    // Update the cart count in local storage
    const totalItems = currentCart.reduce((total, cartItem) => total + cartItem.Quantity, 0);
    setLocalStorage("totalItemsInCart", totalItems);
  };
}