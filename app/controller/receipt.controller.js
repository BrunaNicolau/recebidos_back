const express = require("express");
const router = express.Router();
const receiptsService = require("../service/receipt.service");

router.get("/listReceipts/:id", async function (req, res, next) {
  try {
    const posts = await receiptsService.getReceipts(req, res);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.get("/receiptById/:id", async function (req, res, next) {
  try {
    const posts = await receiptsService.getReceiptById(req, res);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.post("/createReceipts", async function (req, res, next) {
  try {
    const posts = await receiptsService.buildReceiptDoc(req, res);
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
    const posts = await receiptsService.editStatusReceipts(req);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.get("/generate-pdf", async function (req, res) {
  try {
    const doc = await receiptsService.editStatusReceipts(req);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=output.pdf");
    pdf.pipe(doc);
    pdf.end();
  } catch {
    next(e);
  }
});

module.exports = router;
