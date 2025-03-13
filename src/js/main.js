import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

const productData = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("Tents", productData, listElement);

productList.init();

async function loadAlerts() {
    try {
        const response = await fetch("./json/alerts.json");
        if (!response.ok) {
            throw new Error(`Error in loading JSON: ${response.status}`);
        }

        const alerts = await response.json();

        const alertInstance = new Alert(alerts);
        alertInstance.createAlert();
    } catch (error) {
        console.error("Alerts error:", error);
    }
}

loadAlerts();
