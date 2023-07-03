const express = require("express");
const fs = require("fs");
const routes = express.Router();
const path = require("path");

const addNewProduct = (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  console.log("sending html");
};

const submitNewProduct = (req, res, next) => {
  fs.readFile("products.json", (err, data) => {
    let parsedData = [];
    if (data) {
      parsedData = JSON.parse(data);
    }
    parsedData.push(req.body);
    fs.writeFile("products.json", JSON.stringify(parsedData), () => {
      res.send("Product Added Successfully");
    });
  });
};

routes.get("/add-product", addNewProduct);
routes.post("/add-product", submitNewProduct);

exports.routes = routes;
