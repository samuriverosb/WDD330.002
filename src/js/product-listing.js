export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
  
    async init() {
      // Fetch the products for the current category
      const products = await this.dataSource.getData(this.category);
  
      // Debugging: Log the fetched products
      console.log("Fetched products in ProductList:", products);
  
      // Render the products
      this.render(products);
    }
  
    render(products) {
      // Clear the list element
      this.listElement.innerHTML = "";
  
      // Loop through the products and generate HTML
      products.forEach((product) => {
        const productHTML = `
          <li class="product-item">
            <img src="${product.Image}" alt="${product.Name}" />
            <h3>${product.Name}</h3>
            <p>${product.DescriptionHtmlSimple}</p>
            <p>Price: $${product.FinalPrice}</p>
          </li>
        `;
        this.listElement.innerHTML += productHTML;
      });
    }
  }