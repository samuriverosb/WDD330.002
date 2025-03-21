// main.js
// This file handles global functionality for the application. It:
// Loads the Header and Footer:
// Uses loadHeaderFooter from utils.mjs to ensure consistent navigation and footer across all pages.
// Loads Alerts:
// Fetches alerts.json and uses the Alert class to display alerts on the page.

import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";

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
