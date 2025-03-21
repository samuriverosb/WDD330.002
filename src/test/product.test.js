import ProductData from "../js/ProductData.mjs";

async function testProductData() {
  const dataSource = new ProductData();

  // Test getCategoryProducts
  console.log("Testing getCategoryProducts...");
  const category = "tents"; // Replace with a valid category
  const products = await dataSource.getCategoryProducts(category);
  console.log(`Products for category "${category}":`, products);

  // Test findProductById
  console.log("Testing findProductById...");
  const productId = "12345"; // Replace with a valid product ID
  const product = await dataSource.findProductById(productId);
  console.log(`Product details for ID "${productId}":`, product);
}

testProductData();