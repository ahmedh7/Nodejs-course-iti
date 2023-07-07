const port = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./src/routes/adminRoutes");
const shopRoutes = require("./src/routes/shopRoutes");
const app = express();
const { initDB } = require("./src/adaptor/db-connections");
const productRoutes = require("./src/routes/productRoutes");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

initDB((err) => {
  if (err) {
    console.log("Couldn't connect to database");
  } else {
    console.log("Connected successfully to database");
  }
})
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on "http://localhost:${port}"`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/admin", adminRoutes.routes);
app.use("/shop", shopRoutes.routes);
app.use("/product", productRoutes);
app.use("/", (req, res, next) => {
  console.log("Server is running");
  return res.send(
    'Server is running. This is a default response body. Add products through: <a href="http://localhost:3000/admin/add-product">http://localhost:3000/admin/add-product</a> or see list of all products through: <a href="http://localhost:3000/shop/products">http://localhost:3000/shop/products</a>'
  );
});
