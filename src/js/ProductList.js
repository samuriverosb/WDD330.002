import { renderListWithTemplate, getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ProductDetail from "./ProductDetails.mjs";

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
      <button class="preview" data-id="${product.Id}">Preview</button>
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
    document.querySelectorAll(".preview").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.dataset.id;
        const product = list.find((p) => p.Id === productId);
        this.renderModal(productId);
      });
    });
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  renderModal = (productId) => {
    document.getElementById("p-image").src = "";
    document.getElementById("p-image").alt = "";
    document.getElementById("p-brand").innerText = "";
    document.getElementById("p-name").innerText = "";
    document.getElementById("p-color").innerText = "";
    document.getElementById("p-description").innerText = "";
    document.getElementById("p-price").innerText = "";

    const productDetail = new ProductDetail(productId, this.dataSource)
    productDetail.init();
    document.getElementById("modal").classList.remove("hide");
  }

  addProductToCart(product) {
    const cartItems = getLocalStorage("so-cart") || [];
    const existingProduct = cartItems.find((item) => item.Id === product.Id);
    const totalItems = cartItems.reduce((sum, item) => sum + item.Quantity, 0);
    setLocalStorage("totalItemsInCart", totalItems + 1);
    loadHeaderFooter();

    if (existingProduct) {
      existingProduct.Quantity = (existingProduct.Quantity || 1) + 1;
    } else {
      product.Quantity = 1;
      cartItems.push(product);
    }

    setLocalStorage("so-cart", cartItems);

    const notification = document.createElement("div");
    notification.textContent = "Product added to cart!";
    notification.style.position = "fixed";
    notification.style.top = "50px";
    notification.style.right = "60px";
    notification.style.backgroundColor = "green";
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    notification.style.transform = "rotateY(90deg)";
    notification.style.transition = "transform 0.5s ease"

     
    document.body.appendChild(notification);

    setTimeout(() => {
       notification.style.transform = "rotateY(0deg)"; // Flip the card to show the front
    }, 10);
    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
}