const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  await productService.createProduct(req.body);
  res.statusCode = 201;
  res.send("Product created successfully");
};

const getProducts = async (req, res) => {
  const products = await productService.getProducts();
  res.statusCode = 200;
  res.send(products);
};

const getProductsPaginated = async (req, res) => {
  // Page number translates to offset in DB, that is pageNumber*pageSize
  let pageNumber = req.query.pageNumber;
  let pageSize = req.query.pageSize;
  const products = await productService.getProductsPaginated(
    pageNumber ?? 0,
    pageSize ?? 10
  );
  res.statusCode = 200;
  res.send(products);
};

const updateProduct = async (req, res) => {
  const newData = req.body;
  const productId = req.query.productId;
  try {
    const result = await productService.updateProduct(productId, newData);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.statusCode(500);
    res.send("Internal server error");
  }
};

const deleteProduct = async (req, res) => {
  let productId = req.query.productId;
  try {
    const result = await productService.deleteProduct(productId);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.statusCode(500);
    res.send("Internal server error");
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductsPaginated,
  updateProduct,
  deleteProduct,
};
