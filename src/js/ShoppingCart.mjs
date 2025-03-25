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
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartElements = () => {
    const cartElements = getLocalStorage(this.key) || [];
    const htmlElements = cartElements.map((element, index) => cartItemTemplate(element, index));
    const totalItems = cartElements.reduce((sum, item) => sum + item.Quantity, 0);
    document.querySelector(this.parentSelector).innerHTML = htmlElements.join("");
    document.getElementById("list-total-items").innerText = `Items: ${totalItems}`;
    loadHeaderFooter();
    if (cartElements.length > 0) {
      const totalPrice = cartElements.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
      document.getElementById("list-total").innerText = `Total: $${totalPrice.toFixed(2)}`;
    }
    if (cartElements.length === 0) {
      document.getElementById("list-total").innerText = `Total: $0.00`;
      alert("Your cart is empty.");
      return;
    }
    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemIndex = e.target.dataset.index;

        const currentCart = getLocalStorage("so-cart");
        if (currentCart[itemIndex].Quantity === 1) {
          currentCart.splice(itemIndex, 1);
        } else {
          currentCart[itemIndex].Quantity--;
        }
        setLocalStorage("so-cart", currentCart);
        setLocalStorage("totalItemsInCart", totalItems === 0 || totalItems < 0 ? 0 : totalItems - 1);
        loadHeaderFooter();
        document.getElementById("list-total-items").innerText = `Items: ${cartElements.length}`;
        this.renderCartElements();
      });
    });
  };
}