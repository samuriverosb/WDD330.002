import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.js";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();