const port = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/shopRoutes");
const app = express();

app.use(bodyParser.urlencoded());
app.use("/admin", adminRoutes.routes);
app.use("/shop", shopRoutes.routes);
app.use("/", (req, res, next) => {
  console.log("Server is running");
  return res.send(
    'Server is running. This is a default response body. Add products through: <a href="http://localhost:3000/admin/add-product">http://localhost:3000/admin/add-product</a> or see list of all products through: <a href="http://localhost:3000/shop/products">http://localhost:3000/shop/products</a>'
  );
});

app.listen(port, () => {
  console.log(`Listening on "http://localhost:${port}"`);
});
