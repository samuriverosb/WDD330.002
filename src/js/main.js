import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";

// Function to load alerts from a JSON file and handle errors
async function loadAlerts() {
  try {
    // Fetch the JSON data
    const response = await fetch("../public/json/alerts.json"); // Corrected path for the JSON file

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error in loading JSON: ${response.status}`);
    }

    // Parse the JSON data
    const alerts = await response.json();

    // Create and render alerts using the Alert class
    const alertInstance = new Alert(alerts);
    alertInstance.createAlert();
  } catch (error) {
    // Log detailed error messages to the console
    console.error("Alerts error:", error.message);
    console.error("Additional details:", error);
  }
}

// Load header and footer components
loadHeaderFooter();

// Load alerts
loadAlerts();
