import ShoppingCart from "./ShoppingCart.mjs";
import { productCardTemplate } from "./utils.mjs";

const cart = new ShoppingCart("so-cart", "#cart-items");

class ProductListing {
  constructor(dataSource, topProductsContainer) {
    this.dataSource = dataSource;
    this.topProductsContainer = topProductsContainer;
  }

  async init() {
    try {
      const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
      for (const category of categories) {
        const products = await this.dataSource.getCategoryProducts(category);
        this.renderTopProducts(products, category);
      }
    } catch (error) {
      console.error("Error initializing product listing:", error);
    }
  }

  renderTopProducts(products, category) {
    const topProducts = products.slice(0, 2);

    const categoryHTML = `
      <div class="category-section">
        <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
        <div class="category-products">
          ${topProducts.map(productCardTemplate).join("")}
        </div>
        <a href="index.html?category=${category}" class="view-more">View More ${category}</a>
      </div>
    `;

    this.topProductsContainer.innerHTML += categoryHTML;
    this.addCartListeners();
  }

  addCartListeners() {
    const cartButtons = document.querySelectorAll(".add-to-cart");
    cartButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.dataset.id;
        const product = this.dataSource.findProductById(productId); // Ensure this method exists
        cart.addToCart(product);
      });
    });
  }
}