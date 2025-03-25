import { renderListWithTemplate, getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img 
          src="${product.Images.PrimarySmall}" 
          srcset="
            ${product.Images.PrimarySmall} 480w, 
            ${product.Images.PrimaryMedium} 768w, 
            ${product.Images.PrimaryLarge} 1200w" 
          sizes="(max-width: 480px) 100vw, 
                 (max-width: 768px) 50vw, 
                 33vw" 
          alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="add-to-cart-button" data-id="${product.Id}">Add to Cart</button>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.dataset.id;
        const product = list.find((p) => p.Id === productId);
        this.addProductToCart(product);
      });
    });
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  addProductToCart(product) {
    const cartItems = getLocalStorage("so-cart") || [];
    const existingProduct = cartItems.find((item) => item.Id === product.Id);
    const currentItems = localStorage.getItem("totalItemsInCart") == undefined || typeof localStorage.getItem("totalItemsInCart") == "string" ? cartItems.length : localStorage.getItem("totalItemsInCart");
    localStorage.setItem("totalItemsInCart", currentItems + 1);
    loadHeaderFooter();

    if (existingProduct) {
      existingProduct.Quantity = (existingProduct.Quantity || 1) + 1;
    } else {
      product.Quantity = 1;
      cartItems.push(product);
    }

    setLocalStorage("so-cart", cartItems);

    // Custom notification
    const notification = document.createElement("div");
    notification.textContent = "Product added to cart!";
    notification.style.position = "fixed";
    notification.style.bottom = "10px";
    notification.style.right = "10px";
    notification.style.backgroundColor = "green";
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
}