const express = require("express");
const router = express.Router();

const escritorioService = require("../service/office.service");

const validatorNewOffice = require("../models/newOffice.model");
const validatorUpdateOffice = require("../models/updateOffice.model");

router.get("/teste", async function (req, res, next) {
  try {
    res.json("teste");
  } catch (e) {
    next(e);
  }
});

router.get("/officesList/:id", async function (req, res, next) {
  try {
    const listOffice = await escritorioService.getlistOffices(req, res);
    res.json(listOffice);
  } catch (e) {
    next(e);
  }
});

router.get("/getOffice/:id", async function (req, res, next) {
  try {
    const office = await escritorioService.getOffice(req, res);
    res.json(office);
  } catch (e) {
    next(e);
  }
});

router.post("/newOffice", validatorNewOffice, async function (req, res, next) {
  try {
    const msg = await escritorioService.createOffice(req, res);
    res.json(msg);
  } catch (e) {
    next(e);
  }
});

router.put(
  "/editOffice",
  validatorUpdateOffice,
  async function (req, res, next) {
    try {
      const posts = await escritorioService.editOffice(req);
      res.json(posts);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
