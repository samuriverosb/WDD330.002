import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const cartItemTemplate = (item, index) => {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="delete-button" data-index="${index}" style="color: red; cursor: pointer;">X</span>
  </li>`;

  return newItem;
}

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

        const currentCart = getLocalStorage("so-cart");
        currentCart.splice(itemIndex, 1);
        setLocalStorage("so-cart", currentCart);
        this.renderCartElements();
      });
    });

    if (cartElements.length === 0) {
      alert("Your cart is empty.");
      return;
    }
  }
}