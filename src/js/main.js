// main.js
// This file handles global functionality for the application. It:
// Loads the Header and Footer:
// Uses loadHeaderFooter from utils.mjs to ensure consistent navigation and footer across all pages.
// Loads Alerts:
// Fetches alerts.json and uses the Alert class to display alerts on the page.

import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";
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

loadHeaderFooter();
loadAlerts();
