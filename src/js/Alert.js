export default class Alert {
  constructor(alerts) {
    this.alerts = alerts;
  }

  createAlert() {
    if (this.alerts.length === 0) return;

    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    this.alerts.forEach((alert) => {
      // Container
      const alertContainer = document.createElement("div");
      alertContainer.classList.add("alert-container");
      alertContainer.style.backgroundColor = alert.background;
      alertContainer.style.color = alert.color;

      // Message (Paragraph)
      const alertMessage = document.createElement("p");
      alertMessage.textContent = alert.message;

      // Close Button
      const closeButton = document.createElement("button");
      closeButton.textContent = "X";
      closeButton.classList.add("close-alert");
      closeButton.addEventListener("click", () => {
        alertContainer.remove();

        if (document.querySelector(".alert-list").childElementCount === 0) {
          document.querySelector(".alert-list").remove();
        }
      });

      // Add Message and Button - Container
      alertContainer.appendChild(alertMessage);
      alertContainer.appendChild(closeButton);

      alertSection.appendChild(alertContainer);
    });

    document.querySelector("main").prepend(alertSection);
  }
}
