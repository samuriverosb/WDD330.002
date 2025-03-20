import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cart = new ShoppingCart("so-cart", "#cart-items");

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  init = async () => {
    // Load the header and footer
    await loadHeaderFooter();

    // Fetch the product details
    this.product = await this.dataSource.findProductById(this.productId);

    // Render the product details
    this.renderProductDetails("main");

    // Add event listener for the "Add to Cart" button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  };

  addProductToCart() {
    // Use ShoppingCart's addToCart method
    cart.addToCart(this.product);

    // Alert the user and reload the header/footer to update the cart count
    alert("Product added to cart!");
    loadHeaderFooter();
    }
    
    addCartListeners() {
        const cartButtons = document.querySelectorAll(".add-to-cart");
        cartButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            const productId = event.target.dataset.id;
            const product = this.dataSource.findProductById(productId); // Ensure this method exists in your data source
            cart.addToCart(product);
          });
        });
      }

  renderProductDetails(selector) {
    const detailsTemplate = (product) => `
      <section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${product.Images.PrimaryLarge}"
          alt="${product.NameWithoutBrand}"
        />
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>
    `;
    document.querySelector(selector).innerHTML = detailsTemplate(this.product);
  }
}