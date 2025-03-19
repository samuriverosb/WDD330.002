import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, listElement);

productList.init();
document.getElementById("category-title").innerText = category;
// const list = await this.dataSource.getData(this.category);
