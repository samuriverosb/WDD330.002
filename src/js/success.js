import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

document.getElementById("orderId").innerText = getParam("orderId");

document.getElementById("goBackButton").onclick = () => {
  location.assign("/");
}