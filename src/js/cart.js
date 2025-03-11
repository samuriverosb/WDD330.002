import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    document.querySelector(".product-list").innerHTML = "";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
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
</li>`;

  return newItem;
}

const calculateTotal = () => {
  const cartItems = getLocalStorage("so-cart");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal = document.getElementById("cartTotal");
  if (!cartItems) {
    cartFooter.classList.add("hide");
    return;
  }
  const total = cartItems.reduce((acc, item) => {
    return acc + item.FinalPrice;
  }, 0);
  cartTotal.textContent = `$${total}`;
  if (total === 0) {
    cartFooter.classList.add("hide");
  } else {
    cartFooter.classList.remove("hide");
  }
  return total;
};

calculateTotal();

renderCartContents();
