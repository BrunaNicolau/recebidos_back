const express = require("express");
const router = express.Router();
const comunsService = require("../service/comuns.service");

router.get("/authService", async function (req, res, next) {
  try {
    res.json("teste");
  } catch (e) {
    next(e);
  }
});

router.get("/listOffice", async function (req, res, next) {
  try {
    res.json("teste");
  } catch (e) {
    next(e);
  }
});

router.get("/listInstitution", async function (req, res, next) {
  try {
    res.json("teste");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
