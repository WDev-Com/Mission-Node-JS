const express = require("express");
const router = express.Router();
const {
  getPerson,
  createPerson,
  deletePerson,
  updatePerson,
  loginUser,
} = require("../controller/personController");

router
  .get("/", getPerson)
  .post("/signup", createPerson)
  .post("/login", loginUser)
  .delete("/:id", deletePerson)
  .patch("/:id", updatePerson);

module.exports = router;
