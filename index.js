const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const publicRoutes = require("./src/routes/publicRoutes");
const authenticateRoutes = require("./src/routes/authenticateRoutes");
const privateRoutes = require("./src/routes/privateRoutes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", publicRoutes);
app.use("/auth", authenticateRoutes);
app.use("/api", privateRoutes);
app.listen(port, () => {
  console.log("server is running");
});
