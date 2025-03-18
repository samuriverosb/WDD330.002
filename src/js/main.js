import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";
import Search from "./search.js";

const productData = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("Tents", productData, listElement);

productList.init();

if (document.getElementById("search-form")) {
  new Search();
}

if (
  window.location.pathname.includes("/search/") &&
  window.location.search.includes("query=")
) {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");
  if (query) {
    Search.displaySearchResults(query);
  }
}

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
