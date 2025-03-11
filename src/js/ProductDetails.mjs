import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function detailsTemplate(product) {
    return `
        <section class="product-detail">
            <h3>${product.Brand.Name}</h3>

            <h2 class="divider">${product.NameWithoutBrand}</h2>

            <img
            class="divider"
            src="${product.Image}"
            alt="${product.Name}"
            />

            <p class="product-card__price">${product.FinalPrice}</p>

            <p class="product__color">${product.Colors[0].ColorName}</p>

            <p class="product__description">${product.DescriptionHtmlSimple}</p>

            <div class="product-detail__add">
                <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
            </div>
        </section>
    `;
}

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        document.getElementById('addToCart').addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const getCurrentCart = () => Array.isArray(getLocalStorage("so-cart")) ? getLocalStorage("so-cart") : [];

        setLocalStorage("so-cart", [...getCurrentCart(), this.product]);
        alert("Product added to cart!");
    }

    renderProductDetails() {
        const productContainer = document.querySelector("main.divider");

        if (!this.product) {
            productContainer.innerHTML = "<p>Product not found.</p>";
            return;
        }

        productContainer.innerHTML = detailsTemplate(this.product);
    }
}