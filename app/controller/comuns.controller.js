const express = require("express");
const router = express.Router();
const passport = require("passport");
const authenticationMiddleware = require("../models/authMiddleware.model");

router.get(
  "/authService",
  authenticationMiddleware,
  async function (req, res, next) {
    try {
      if (req.query.fail)
        res.render("login", { message: "Usuário e/ou senha incorretos!" });
      else res.render("login", { message: null });
    } catch (e) {
      next(e);
    }
  }
);

router.post("/authService", async function (req, res, next) {
  try {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login?fail=true",
    });
  } catch (e) {
    next(e);
  }
});

router.get("/listOffice", async function (req, res, next) {
  try {
    res.json("teste");
  } catch (e) {
    next(e);
  }
});

router.get("/listInstitution", async function (req, res, next) {
  try {
    res.json("teste");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
