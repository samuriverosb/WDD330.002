import { setLocalStorage, getLocalStorage } from "./utils.mjs";

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
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const getCurrentCart = () =>
      Array.isArray(getLocalStorage("so-cart"))
        ? getLocalStorage("so-cart")
        : [];
    setLocalStorage("so-cart", [...getCurrentCart(), this.product]);
    alert("Product added to cart!");
  }

  renderProductDetails(selector) {
    document
      .querySelector(selector)
      .insertAdjacentHTML("afterbegin", detailsTemplate(this.product));
  }
}
