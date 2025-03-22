import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetail {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    console.log("Initializing ProductDetail..."); // Debugging log
    this.product = await this.dataSource.findProductById(this.productId);
    console.log("Fetched product details:", this.product); // Debugging log

    this.renderProductDetails();

    // Add event listener for the Add to Cart button
    document
      .getElementById("add-to-cart")
      .addEventListener("click", () => this.addProductToCart(this.product));
  }

  addProductToCart(product) {
    console.log("Adding product to cart:", product); // Debugging log
    const cartItems = getLocalStorage("so-cart") || [];
    const existingProduct = cartItems.find((item) => item.Id === product.Id);

    if (existingProduct) {
      existingProduct.Quantity = (existingProduct.Quantity || 1) + 1;
      console.log("Increased quantity for product:", existingProduct); // Debugging log
    } else {
      product.Quantity = 1;
      cartItems.push(product);
      console.log("Added new product to cart:", product); // Debugging log
    }

    setLocalStorage("so-cart", cartItems);

    // Custom notification
    const notification = document.createElement("div");
    notification.textContent = "Product added to cart!";
    notification.style.position = "fixed";
    notification.style.top = "10px"; // Position it near the top
    notification.style.right = "50px"; // Adjust to align near the backpack icon
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

  renderProductDetails() {
    console.log("Rendering product details..."); // Debugging log
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;

  const euroPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}