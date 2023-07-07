const productDal = require("../dal/product.dal");

const createProduct = async (productData) => {
  try {
    const product = await productDal.createProduct(productData);
    return product;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getProducts = async () => {
  try {
    const products = await productDal.getProducts();
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getProductsPaginated = async (pageNumber, pageSize) => {
  try {
    const products = await productDal.getProductsPaginated(
      pageNumber,
      pageSize
    );
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateProduct = async () => {
  try {
    const product = await productDal.updateProduct(productId, newData);
    return product;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteProduct = async (productId) => {
  try {
    const result = await productDal.deleteProduct(productId);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductsPaginated,
  updateProduct,
  deleteProduct,
};
