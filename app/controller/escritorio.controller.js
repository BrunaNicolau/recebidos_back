const express = require("express");
const router = express.Router();
const escritorioService = require("../service/escritorio.service");

router.get("/teste", async function (req, res, next) {
  try {
    res.json("teste");
  } catch (e) {
    next(e);
  }
});

router.get("/officesList", async function (req, res, next) {
  try {
    const posts = await escritorioService.getOffices();
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.put("/editOffices", async function (req, res, next) {
  try {
    const posts = await escritorioService.createOffice(req);
    res.json(posts);
  } catch (e) {
    next(e);
  }
});

router.post("/newOffices", async function (req, res, next) {
  const post = req.body;
  console.log(req);

  res.send('welcome, ' + req.body.dia);
  try {
    const newPost = await postsService.savePost(post);
    res.json(post);
  } catch (e) {
    next(e);
  }
});


module.exports = router;
