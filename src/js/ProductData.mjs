const baseURL = import.meta.env.VITE_SERVER_URL

export default class ProductData {
  constructor() {
    this.baseURL = baseURL; // Base URL for fetching data from the API
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(productId) {
    try {
      const response = await fetch(`${this.baseURL}product/${productId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product with ID: ${productId}`);
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error("Error finding product by ID:", error);
      return null; // Return null if the fetch fails
    }
  }
}