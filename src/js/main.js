import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productListElement = document.querySelector(".product-list");
const dataSource = new ProductData("tents");
const productList = new ProductList("Tents", dataSource, productListElement);

productList.init();
