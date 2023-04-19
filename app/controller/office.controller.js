const express = require("express");
const router = express.Router();
const escritorioService = require("../service/office.service");

router.get("/teste", async function (req, res, next) {
  try {
    res.json("teste");
  } catch (e) {
    next(e);
  }
});

router.get("/officesList/:id", async function (req, res, next) {
  try {
    const listOffice = await escritorioService.getlistOffices(req);
    res.json(listOffice);
  } catch (e) {
    next(e);
  }
});

router.get("/getOffice/:id", async function (req, res, next) {
  try {
    const office = await escritorioService.getOffice(req);
    res.json(office);
  } catch (e) {
    next(e);
  }
});

router.post("/newOffice", async function (req, res, next) {
  try {
    const msg = await escritorioService.createOffice(req);
    res.json(msg);
  } catch (e) {
    next(e);
  }
});

router.put("/editOffices", async function (req, res, next) {
  try {
    const posts = await escritorioService.createOffice(req);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});


module.exports = router;
