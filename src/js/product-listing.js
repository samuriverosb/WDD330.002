import ProductData from "./ProductData.mjs";
import { qs } from "./utils.mjs";
import { productCardTemplate } from "./utils.mjs";

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
    const topProducts = products.slice(0, 2); // Get the top 2 products

    const categoryHTML = `
      <div class="category-section">
        <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
        <div class="category-products">
          ${topProducts.map(productCardTemplate).join("")}
        </div>
        <a href="index.html?category=${category}" class="view-more">View More ${category}</a>
      </div>
    `;

    this.topProductsContainer.insertAdjacentHTML("beforeend", categoryHTML);
  }
}

// Initialize the product listing
const dataSource = new ProductData();
const topProductsContainer = qs("#top-products");
const productListing = new ProductListing(dataSource, topProductsContainer);
productListing.init();