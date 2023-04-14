const express = require("express");
const router = express.Router();

router.get("/teste", async function (req, res, next) {
  try {
    res.json("teste");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
