const express = require("express");
const router = express.Router();
const receiptsService = require("../service/receipt.service");
const path = require('path'); 

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
    const posts = await receiptsService.editStatusReceipts(req);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.get("/generate-pdf", async function (req, res, next) {
  try {
    //TODO: por no lugar certo 
    const pdfPath = path.join(__dirname, '../utils/storage', '/storagefile.pdf');
    res.sendFile(pdfPath);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
