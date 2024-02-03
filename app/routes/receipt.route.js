const express = require("express");
const router = express.Router();
const receiptsService = require("../controllers/receipt.controller");
const errorHandlingMiddleware = require("../utils/errorMiddleware.service");

router.get("/teste", async function (res) {
  try {
    res.json("teste ok");
  } catch (e) {
    next(e);
  }
});

router.get("/receiptsList/:institutionId", async function (req, res) {
  try {
    const posts = await receiptsService.listReceipts(req.params.institutionId);
    res.json(posts);
  } catch (error) {
    errorHandlingMiddleware(error, res);
  }
});

router.get("/receiptById/:receiptId", async function (req, res) {
  try {
    const posts = await receiptsService.receiptById(
      req.params.receiptId,
      req.headers["office"]
    );
    res.json(posts);
  } catch (error) {
    errorHandlingMiddleware(error, res);
  }
});

router.post("/newReceipt", async function (req, res) {
  try {
    const posts = await receiptsService.newReceipt(req.body);
    res.json(posts);
  } catch (error) {
    errorHandlingMiddleware(error, res);
  }
});

router.put("/editReceipt", async function (req, res) {
  try {
    const posts = await receiptsService.editReceipt(req.body);
    res.json(posts);
  } catch (error) {
    errorHandlingMiddleware(error, res);
  }
});

router.patch("/editReceipt", async function (req, res) {
  try {
    const posts = await receiptsService.editStatusReceipt(req.body);
    res.json(posts);
  } catch (error) {
    errorHandlingMiddleware(error, res);
  }
});

router.get("/generatePdf/:receiptId", async function (req, res) {
  try {
    const doc = await receiptsService.buildReceiptDoc(req.params.receiptId);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=output.pdf");
    doc.pipe(res);
    doc.end();
  } catch (error) {
    errorHandlingMiddleware(error, res);
  }
});

module.exports = router;
