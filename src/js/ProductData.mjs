// const baseURL = import.meta.env.VITE_SERVER_URL;
// const response = await fetch(`${baseURL}products/search/${category}`);

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }
  
  export default class ProductData {
    constructor() {}
  
    // Fetch data for a specific category
    getData = async (category) => {
      try {
        // Fetch the corresponding JSON file based on the category
        const response = await fetch(`/json/${category}.json`);
        const data = await convertToJson(response);
        return data; // Return the full data array
      } catch (error) {
        console.error(`Error fetching data for category "${category}":`, error);
        return [];
      }
    };
  
    // Fetch a specific product by ID
    async findProductById(id, category) {
      try {
        // Fetch the category JSON file
        const response = await fetch(`/json/${category}.json`);
        const data = await convertToJson(response);
  
        // Find the product with the matching ID
        const product = data.find((item) => item.Id === id);
        return product || null;
      } catch (error) {
        console.error(`Error fetching product with ID "${id}":`, error);
        return null;
      }
    }
  }