const express = require("express");
const router = express.Router();
const escritorioService = require("../service/office.service");
const validatorNewOffice = require("../models/newOffice.model");
const updateOfficeValidators = require("../models/updateOffice.model");
const errorHandlingMiddleware = require("../middleware/errorMiddleware.service");

router.get("/teste", async function (res, next) {
  try {
    res.json("teste ok");
  } catch (e) {
    next(e);
  }
});

router.get("/officesList/:institutionId", async function (req, res) {
  try {
    const listOffice = await escritorioService.listOffices(
      req.params.institutionId
    );
    res.json(listOffice);
  } catch (error) {
    errorHandlingMiddleware(error, res);
  }
});

router.get("/officeById/:officeId", async function (req, res) {
  try {
    const office = await escritorioService.officeById(req.params.officeId);
    res.json(office);
  } catch (error) {
    errorHandlingMiddleware(error, res);
  }
});

router.post("/newOffice", validatorNewOffice, async function (req, res) {
  try {
    const newOfficeResult = await escritorioService.newOffice(req.body);
    res.json(newOfficeResult);
  } catch (error) {
    errorHandlingMiddleware(error, res);
  }
});

router.put("/editOffice", updateOfficeValidators, async function (req, res) {
  try {
    const editedOffice = await escritorioService.editOffice(req.body);
    res.json(editedOffice);
  } catch (error) {
    errorHandlingMiddleware(error, res);
  }
});

module.exports = router;
