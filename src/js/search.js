import ProductData from "./ProductData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

const productCardTemplate = (product) => `
  <li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a
    >
  </li>
`;

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

    // Redirect to the search results page with the query parameter
    window.location.href = `/search/index.html?query=${encodeURIComponent(query)}`;
  }

  static async displaySearchResults(query) {
    const resultsContainer = document.querySelector(".product-list");
    const searchTermDisplay = document.getElementById("search-term");

    if (searchTermDisplay) {
      searchTermDisplay.textContent = query;
    }

    try {
      // We need to search all categories
      const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
      let allProducts = [];

      // Get products from all categories
      for (const category of categories) {
        const dataSource = new ProductData(category);
        const products = await dataSource.getData();
        allProducts = allProducts.concat(products);
      }

      // Filter products based on search query
      const searchResults = allProducts.filter(product => {
        const name = product.Name.toLowerCase();
        const nameWithoutBrand = product.NameWithoutBrand.toLowerCase();
        const description = product.DescriptionHtmlSimple?.toLowerCase() || "";

        return (
          name.includes(query.toLowerCase()) ||
          nameWithoutBrand.includes(query.toLowerCase()) ||
          description.includes(query.toLowerCase())
        );
      });

      // Display results or no results message
      if (searchResults.length > 0) {
        renderListWithTemplate(
          productCardTemplate,
          resultsContainer,
          searchResults,
          "afterbegin",
          true
        );
        document.getElementById("results-count").textContent = searchResults.length;
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
