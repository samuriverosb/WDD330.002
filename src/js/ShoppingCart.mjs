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
    const cartFooter = document.querySelector(".list-footer");
    if (cartElements.length > 0) {
      cartFooter.classList.remove("hide");
      const total = cartElements.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
      document.querySelector(".list-total").innerText = `$${total.toFixed(2)}`;
    } else {
      cartFooter.classList.add("hide");
      parentElement.innerHTML = "<p>Your cart is empty.</p>";
    }
  
    // Add event listeners for delete buttons
    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemIndex = e.target.dataset.index;
  
        const currentCart = getLocalStorage(this.key);
        currentCart.splice(itemIndex, 1); // Remove the item
        setLocalStorage(this.key, currentCart); // Update local storage
        this.renderCartElements(); // Re-render the cart
  
        // Show a standard alert for 2 seconds
        const alertMessage = document.createElement("div");
        alertMessage.textContent = "Item has been deleted from the cart.";
        alertMessage.style.position = "fixed";
        alertMessage.style.top = "10px";
        alertMessage.style.right = "10px";
        alertMessage.style.backgroundColor = "red";
        alertMessage.style.color = "white";
        alertMessage.style.padding = "10px";
        alertMessage.style.borderRadius = "5px";
        alertMessage.style.zIndex = "1000";
        document.body.appendChild(alertMessage);
  
        // Remove the alert after 2 seconds
        setTimeout(() => {
          alertMessage.remove();
        }, 2000);
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

    // Re-render the cart
    this.renderCartElements();
  };
}