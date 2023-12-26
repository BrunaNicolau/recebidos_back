const express = require("express");
const router = express.Router();
const receiptsService = require("../service/receipt.service");

router.get("/listReceipts/:institutionId", async function (req, res, next) {
  try {
    const posts = await receiptsService.getReceipts(req, res);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.get("/receiptById/:receiptId", async function (req, res, next) {
  try {
    const posts = await receiptsService.getReceiptById(req, res);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.post("/createReceipts", async function (req, res, next) {
  try {
    const posts = await receiptsService.createReceipts(req, res);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.put("/editReceipt", async function (req, res, next) {
  try {
    const posts = await receiptsService.editReceipts(req);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.patch("/editReceipt", async function (req, res, next) {
  try {
    const posts = await receiptsService.editStatusReceipts(req, res);
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
