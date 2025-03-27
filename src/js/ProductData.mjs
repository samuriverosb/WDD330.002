function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  async searchProducts(query) {
    const data = await this.getData();
    const searchTerm = query.toLowerCase();

    let products = data;

    if (!Array.isArray(data) && data.Result) {
      products = data.Result;
    }

    return products.filter((product) => {
      if (!product) return false;

      const name = (product.Name || "").toLowerCase();
      const nameWithoutBrand = (product.NameWithoutBrand || "").toLowerCase();
      const description = (product.DescriptionHtmlSimple || "").toLowerCase();

      return (
        name.includes(searchTerm) ||
        nameWithoutBrand.includes(searchTerm) ||
        description.includes(searchTerm)
      );
    });
  }
}
