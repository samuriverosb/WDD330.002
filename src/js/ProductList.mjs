import { renderListWithTemplate, productCardTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category; // The category to display (e.g., "tents")
    this.dataSource = dataSource; // The data source for fetching products
    this.listElement = listElement; // The DOM element where the list will be rendered
  }

  async init() {
    try {
      // Fetch the list of products for the given category
      const list = await this.dataSource.getCategoryProducts(this.category);
  
      // Render the list of products
      this.renderList(list);
  
      // Update the page title with the category name
      document.querySelector(".title").innerHTML = `Top Products: ${this.category}`;
    } catch (error) {
      console.error("Error initializing product list:", error);
    }
  }
  renderList(list) {
    // Use the shared productCardTemplate to render the list
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}