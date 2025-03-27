import ProductData from "./ProductData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

const productCardTemplate = (product) => {
  let imagePath = product.Image;

  if (!imagePath && product.Images && product.Images.PrimaryLarge) {
    imagePath = product.Images.PrimaryLarge;
  }

  return `
  <li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img
        src="${imagePath}"
        alt="${product.NameWithoutBrand}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.FinalPrice}</p></a
    >
  </li>
`;
};

export default class Search {
  constructor() {
    this.form = document.getElementById("search-form");
    this.setupListeners();
  }

  setupListeners() {
    this.form.addEventListener("submit", this.handleSearch.bind(this));
  }

  async handleSearch(event) {
    event.preventDefault();

    const query = document.getElementById("search-input").value.toLowerCase();

    window.location.href = `/search/index.html?query=${encodeURIComponent(query)}`;
  }

  static async displaySearchResults(query) {
    const resultsContainer = document.querySelector(".product-list");
    const searchTermDisplay = document.getElementById("search-term");

    if (searchTermDisplay) {
      searchTermDisplay.textContent = query;
    }

    try {
      const categories = ["tents", "backpacks", "sleeping-bags"];
      let allResults = [];

      for (const category of categories) {
        const dataSource = new ProductData(category);
        try {
          const categoryResults = await dataSource.searchProducts(query);
          allResults = allResults.concat(categoryResults);
        } catch (err) {
          console.warn(`Could not search ${category}:`, err);
        }
      }

      // Display results or no results message
      if (allResults.length > 0) {
        renderListWithTemplate(
          productCardTemplate,
          resultsContainer,
          allResults,
          "afterbegin",
          true,
        );
        document.getElementById("results-count").textContent =
          allResults.length;
      } else {
        resultsContainer.innerHTML = `<p class="no-results">No products found matching "${query}"</p>`;
        document.getElementById("results-count").textContent = 0;
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      resultsContainer.innerHTML = `<p class="error">An error occurred while searching. Please try again.</p>`;
    }
  }
}

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
