const express = require("express");
const router = express.Router();
const postsService = require("../service/comuns.service");

router.get("/posts", async function (req, res, next) {
  try {
    const posts = await postsService.getPosts();
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
