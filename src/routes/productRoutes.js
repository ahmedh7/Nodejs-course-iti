const express = require("express");

const productHandler = require("../controllers/product.controller");

const routes = express.Router();

routes.post("/", productHandler.createProduct);
routes.get("/", productHandler.getProducts);
routes.get("/paginated", productHandler.getProducts);
routes.delete("/delete", productHandler.deleteProduct);
routes.patch("/update", productHandler.updateProduct);

module.exports = routes;
