import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Use the datasource to get the details for the current product. findProductById will return a promise! Use await or .then() to process it.
    this.product = await this.dataSource.findProductById(this.productId);

    // The product details are needed before rendering the HTML
    this.renderProductDetails();

    // Once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing.
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    const existingItem = cartItems.find((cartItem) => cartItem.Id === this.product.Id);
    
    if (existingItem) {
      existingItem.Quantity += 1; // Se já existir, aumenta a quantidade
    } else {
        this.product.Quantity = 1; // Se não existir, define Quantity como 1
        cartItems.push(this.product);
    }
    
    setLocalStorage("so-cart", cartItems);
  
    // Create a custom alert
    const alertMessage = document.createElement("div");
    alertMessage.textContent = "Item added to cart successfully!";
    alertMessage.style.position = "fixed";
    alertMessage.style.top = "10px";
    alertMessage.style.right = "10px";
    alertMessage.style.backgroundColor = "green";
    alertMessage.style.color = "white";
    alertMessage.style.padding = "10px";
    alertMessage.style.borderRadius = "5px";
    alertMessage.style.zIndex = "1000";
    document.body.appendChild(alertMessage);
  
    // Automatically remove the alert after 2 seconds
    setTimeout(() => {
      alertMessage.remove();
    }, 2000);
  }

  renderProductDetails() {
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