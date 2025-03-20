// product-listing.js:
// Handles fetching and rendering top products for multiple categories.
// Includes functionality for adding products to the cart from the listing page.
// Uses a DataSource class to fetch category data.

class DataSource {
    async getCategoryProducts(category) {
      try {
        // Fetch the JSON file for the given category
        const response = await fetch(`../public/json/${category}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for category: ${category}`);
        }
        const data = await response.json();
  
        // Handle different structures (e.g., "Result" key for sleeping-bags.json)
        return data.Result || data; // Use `Result` if it exists, otherwise return the data directly
      } catch (error) {
        console.error("Error fetching category products:", error);
        return [];
      }
    }
  }
  
  class ProductListing {
    constructor(dataSource, topProductsContainer) {
      this.dataSource = dataSource;
      this.topProductsContainer = topProductsContainer;
    }
  
    async init() {
      try {
        // Fetch and render top products for each category
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
      // Render only the top 2 products for each category
      const topProducts = products.slice(0, 2);
  
      const categoryHTML = `
        <div class="category-section">
          <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <div class="category-products">
            ${topProducts
              .map(
                (product) => `
              <div class="product-card">
                <a href="../product_pages/index.html?product=${product.Id}">
                  <img src="${product.Images?.PrimaryLarge || product.Image}" alt="${product.Name}" />
                  <h4>${product.Name}</h4>
                </a>
                <p>${product.DescriptionHtmlSimple || "No description available."}</p>
                <p>Price: $${product.FinalPrice || "N/A"}</p>
                <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
              </div>
            `
              )
              .join("")}
          </div>
          <a href="index.html?category=${category}" class="view-more">View More ${category}</a>
        </div>
      `;
  
      this.topProductsContainer.innerHTML += categoryHTML;
  
      // Add event listeners for "Add to Cart" buttons
      this.addCartListeners();
    }
  
    addCartListeners() {
      const cartButtons = document.querySelectorAll(".add-to-cart");
      cartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const productId = event.target.dataset.id;
          this.addToCart(productId);
        });
      });
    }
  
    addToCart(productId) {
      console.log(`Product ${productId} added to cart.`);
      // Implement cart functionality here
    }
  }
  
  // Initialize the product listing
  const dataSource = new DataSource();
  const topProductsContainer = document.getElementById("top-products");
  const productListing = new ProductListing(dataSource, topProductsContainer);
  productListing.init();