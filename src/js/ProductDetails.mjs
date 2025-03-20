// ProductDetails.mjs:
// Handles fetching and rendering details for a single product.
// Includes functionality for adding a product to the cart.

import { setLocalStorage, getLocalStorage, loadHeaderFooter } from "./utils.mjs";

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
    const getCurrentCart = () =>
      Array.isArray(getLocalStorage("so-cart"))
        ? getLocalStorage("so-cart")
        : [];
    setLocalStorage("so-cart", [...getCurrentCart(), this.product]);

    // Update the cart count
    const totalItemsInCart =
      getLocalStorage("totalItemsInCart") === undefined
        ? getCurrentCart().length
        : parseInt(getLocalStorage("totalItemsInCart"));
    setLocalStorage("totalItemsInCart", totalItemsInCart + 1);

    // Alert the user and reload the header/footer to update the cart count
    alert("Product added to cart!");
    loadHeaderFooter();
  }

  renderProductDetails(selector) {
    document
      .querySelector(selector)
      .insertAdjacentHTML("afterbegin", detailsTemplate(this.product));
  }
}