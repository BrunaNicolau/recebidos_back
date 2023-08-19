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

router.put("/editReceipt", async function (req, res, next) {
  try {
    console.log("/editReceipt bateu aq")
    const posts = await receiptsService.editReceipts();
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.put("/createReceipts", async function (req, res, next) {
  try {
    const posts = await receiptsService.newReceipts();
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.put("/updateSatusReceipts", async function (req, res, next) {
  try {
    const posts = await receiptsService.editStatusReceipts();
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
