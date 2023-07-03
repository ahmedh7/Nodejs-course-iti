const express = require("express");
const fs = require("fs");
const routes = express.Router();

const getAllProducts = (req, res, next) => {
  fs.readFile("products.json", (err, data) => {
    const parsedData = data ? JSON.parse(data) : [];
    console.log("sending products");
    res.send(
      `<html><head><title>Products List</title></head><body><h1>List of products ...</h1> <ul>${parsedData.map(
        (product) => `<li> product name ${product.title}</li>`
      )}</ul> </form></body></html>`
    );
  });
};

routes.get("/products", getAllProducts);
exports.routes = routes;
