import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      // Fetch the product list from the data source
      const products = await this.dataSource.getData(this.category);

      // Render the product list
      this.renderList(products);

      // Update the page title with the category name
      document.querySelector(".title").textContent = this.category;

      // Add event listeners for "Add to Cart" buttons
      this.addCartEventListeners(products);
    } catch (error) {
      console.error("Error loading products:", error);
      this.listElement.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
    }
  }

  renderList(products) {
    if (products.length === 0) {
      this.listElement.innerHTML = `<p>No products found for this category.</p>`;
      return;
    }

    this.listElement.innerHTML = products
      .map(
        (product) => `
        <li class="product-card">
          <a href="/product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimarySmall}" alt="${product.Name}">
            <h3>${product.Name}</h3>
            <p>${product.Description}</p>
            <p class="price">$${product.FinalPrice.toFixed(2)}</p>
          </a>
          <button class="add-to-cart-button" data-id="${product.Id}">Add to Cart</button>
        </li>
      `
      )
      .join("");
  }

  addCartEventListeners(products) {
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.dataset.id;
        const product = products.find((p) => p.Id === productId);
        this.addProductToCart(product);
      });
    });
  }

  addProductToCart(product) {
    // Get the current cart from localStorage
    const cart = getLocalStorage("so-cart") || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.Id === product.Id);

    if (existingProduct) {
      // If the product is already in the cart, increase its quantity
      existingProduct.Quantity += 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      product.Quantity = 1;
      cart.push(product);
    }

    // Save the updated cart to localStorage
    setLocalStorage("so-cart", cart);

    // Show a notification
    this.showAddToCartNotification();
  }

  showAddToCartNotification() {
    const notification = document.createElement("div");
    notification.textContent = "Product added to cart!";
    notification.style.position = "fixed";
    notification.style.top = "50px";
    notification.style.right = "50px";
    notification.style.backgroundColor = "green";
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "1000";

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
}