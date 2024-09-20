const express = require("express");
const router = express.Router();

const {
  createMenu,
  getMenu,
  updateMenuItem,
  deleteMenuItem,
} = require("../controller/menuItemController");

router
  .post("/", createMenu)
  .get("/", getMenu)
  .patch("/:id", updateMenuItem)
  .delete("/:id", deleteMenuItem);

module.exports = router;
