const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    
  }
  getData = async (category) => {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`)
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error(error)
      return;
    }
  }
  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error(error)
      return;
    }
  }
  
}


