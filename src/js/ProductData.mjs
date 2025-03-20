export default class ProductData {
    constructor(baseURL = "../public/json/") {
      this.baseURL = baseURL; // Base URL for fetching JSON files
    }
  
    // Fetch all products for a specific category
    async getCategoryProducts(category) {
      try {
        const response = await fetch(`${this.baseURL}${category}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for category: ${category}`);
        }
        const data = await response.json();
        return data.Result || data; // Adjust based on your JSON structure
      } catch (error) {
        console.error("Error fetching category products:", error);
        return [];
      }
    }
  
    // Fetch details for a specific product by ID
    async findProductById(productId, category) {
      try {
        const products = await this.getCategoryProducts(category);
        const product = products.find((item) => item.Id === productId);
        if (!product) {
          throw new Error(`Product with ID ${productId} not found in category ${category}`);
        }
        return product;
      } catch (error) {
        console.error("Error finding product by ID:", error);
        return null;
      }
    }
  }