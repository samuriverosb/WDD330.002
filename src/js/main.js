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
