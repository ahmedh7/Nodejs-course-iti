const productModel = require("../models/product");

const createProduct = async (productData) => {
  //call database to crate product
  // create method takes array of documnets as parameter
  try {
    const result = await productModel.create([productData]);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getProducts = async () => {
  try {
    const products = await productModel.aggregate([
      {
        $project: {
          __v: 0,
          _id: 0,
        },
      },
    ]);
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getProductsPaginated = async (pageNumber, pageSize) => {
  try {
    // Page number translates to $skip in MongoDB, that is pageNumber*pageSize

    const products = await productModel.aggregate([
      {
        $skip: Number(pageNumber) * Number(pageSize),
      },
      {
        $limit: Number(pageSize),
      },
    ]);
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateProduct = async (productId, newData) => {
  try {
    const result = await productModel.updateOne(
      { productId: productId },
      { $set: newData }
    );
    ///// newData example//////
    // const newData = {
    //     name: "New Product Name",
    //     description: "New Product Description",
    //     price: 99.99,
    //     quantity: 50,
    //     category: "New Product Category"
    //   };
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteProduct = async (productId) => {
  try {
    const result = await productModel.deleteOne({ productId: productId });
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
