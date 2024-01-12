const express = require("express");
const router = express.Router();
const escritorioService = require("../service/office.service");
const validatorNewOffice = require("../models/newOffice.model");
const updateOfficeValidators = require("../models/updateOffice.model");

router.get("/teste", async function (req, res, next) {
  try {
    res.json("teste ok");
  } catch (e) {
    next(e);
  }
});

router.get("/officesList/:institutionId", async function (req, res, next) {
  try {
    const listOffice = await escritorioService.listOffices(req, res);
    res.json(listOffice);
  } catch (e) {
    next(e);
  }
});

router.get("/officeById/:officeId", async function (req, res, next) {
  try {
    const office = await escritorioService.officeById(req, res);
    res.json(office);
  } catch (e) {
    next(e);
  }
});

router.post("/newOffice", validatorNewOffice, async function (req, res, next) {
  try {
    const msg = await escritorioService.newOffice(req, res);
    res.json(msg);
  } catch (e) {
    next(e);
  }
});

router.put(
  "/editOffice",
  updateOfficeValidators,
  async function (req, res, next) {
    try {
      const posts = await escritorioService.editOffice(req, res);
      res.json(posts);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
