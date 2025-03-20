// utils.mjs:
// Provides utility functions like loadHeaderFooter for consistent header/footer rendering.
// Includes helper functions for rendering templates and managing local storage.

// Wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
  }
  
  // Retrieve data from local storage
  export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
  
  // Save data to local storage
  export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  // Set a listener for both touchend and click
  export function setClick(selector, callback) {
    const element = qs(selector);
    if (!element) return;
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  }
  
  // Get a query parameter from the URL
  export const getParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };
  
  // Render a list of items using a template function
  export const renderListWithTemplate = (
    templateFunction,
    parentElement,
    list,
    position = "afterbegin",
    clear = false
  ) => {
    if (clear) {
      parentElement.innerHTML = "";
    }
    list.forEach((element) => {
      parentElement.insertAdjacentHTML(position, templateFunction(element));
    });
  };
  
  // Render a single template with optional callback
  export const renderWithTemplate = (template, parentElement, data, callback) => {
    parentElement.innerHTML = template;
    if (callback) {
      callback(data);
    }
  };
  
  // Template for rendering a product card
  export const productCardTemplate = (product) => `
    <div class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Images?.PrimaryLarge || product.Image}" alt="${product.Name}" />
        <h4>${product.Name}</h4>
      </a>
      <p>${product.DescriptionHtmlSimple || "No description available."}</p>
      <p>Price: $${product.FinalPrice || "N/A"}</p>
      <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;
  
  // Load an HTML template from a file
  export const loadTemplate = async (path) => {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${path}`);
      }
      return await response.text();
    } catch (error) {
      console.error(error);
      return "";
    }
  };
  
  // Update the cart count in the header
  export const updateCartCount = () => {
    const cart = getLocalStorage("so-cart");
    const totalItems = Array.isArray(cart)
      ? cart.reduce((total, item) => total + (item.Quantity || 1), 0)
      : 0;
    const cartCountElement = qs("#totalItemsInCart");
    if (cartCountElement) {
      cartCountElement.innerText = totalItems;
    }
  };
  
  // Load and render the header and footer
  export const loadHeaderFooter = async () => {
    const header = await loadTemplate("../partials/header.html");
    const footer = await loadTemplate("../partials/footer.html");
    renderWithTemplate(header, qs("#main-header"));
    renderWithTemplate(footer, qs("#main-footer"));
    updateCartCount(); // Update the cart count after loading the header
  };