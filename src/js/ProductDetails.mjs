import ProductData from "./ProductData.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cart = new ShoppingCart("so-cart", "#cart-items");

export default class ProductDetails {
  constructor(productId) {
    this.productId = productId;
    this.product = {};
    this.dataSource = new ProductData();
  }

  async init() {
    // Load the header and footer
    await loadHeaderFooter();

    // Fetch the product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Check if the product exists
    if (!this.product) {
      console.error("Product not found.");
      document.querySelector("main").innerHTML = "<p>Product not found. Please try again later.</p>";
      return; // Stop further execution if the product is not found
    }

    // Render the product details
    this.renderProductDetails("#product-details");

    // Add event listener for the "Add to Cart" button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    // Use ShoppingCart's addToCart method
    cart.addToCart(this.product);

    // Alert the user and reload the header/footer to update the cart count
    alert("Product added to cart!");
    loadHeaderFooter();
  }

  renderProductDetails(selector) {
    const detailsTemplate = (product) => `
    <section class="product-detail">
      <h3>${product.Brand?.Name || "Unknown Brand"}</h3>
      <h2 class="divider">${product.NameWithoutBrand || "Unknown Product"}</h2>
      <img
        class="divider"
        src="${product.Images?.PrimaryLarge || "/images/placeholder.png"}"
        alt="${product.NameWithoutBrand || "Product Image"}"
      />
      <p class="product-card__price">$${product.FinalPrice || "0.00"}</p>
      <p class="product__color">${product.Colors?.[0]?.ColorName || "No color specified"}</p>
      <p class="product__description">
        ${product.DescriptionHtmlSimple || "No description available."}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>
  `;
    document.querySelector(selector).innerHTML = detailsTemplate(this.product);
  }
}