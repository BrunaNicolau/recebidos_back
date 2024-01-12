const express = require("express");
const router = express.Router();
const receiptsService = require("../service/receipt.service");

router.get("/teste", async function (req, res, next) {
  try {
    res.json("teste ok");
  } catch (e) {
    next(e);
  }
});

router.get("/receiptsList/:institutionId", async function (req, res, next) {
  try {
    const posts = await receiptsService.listReceipts(req, res);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.get("/receiptById/:receiptId", async function (req, res, next) {
  try {
    const posts = await receiptsService.receiptById(req, res);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.post("/newReceipt", async function (req, res, next) {
  try {
    const posts = await receiptsService.newReceipt(req, res);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.put("/editReceipt", async function (req, res, next) {
  try {
    const posts = await receiptsService.editReceipt(req, res);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.patch("/editReceipt", async function (req, res, next) {
  try {
    const posts = await receiptsService.editStatusReceipt(req, res);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.get("/generatePdf/:receiptId", async function (req, res, next) {
  try {
    const doc = await receiptsService.buildReceiptDoc(req);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=output.pdf");
    doc.pipe(res);
    doc.end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
