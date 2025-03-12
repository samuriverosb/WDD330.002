import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productData = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("Tents", productData, listElement);

productList.init();
