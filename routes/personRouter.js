const express = require("express");
const router = express.Router();
const {
  getPerson,
  createPerson,
  deletePerson,
  updatePerson,
} = require("../controller/personController");

router
  .get("/", getPerson)
  .post("/", createPerson)
  .delete("/:id", deletePerson)
  .patch("/:id", updatePerson);

module.exports = router;
