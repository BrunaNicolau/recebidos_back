const express = require("express");
const router = express.Router();
const authDB = require("../repositories/auth.repository");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { UnauthorizedError, BadRequestError } = require("../utils/errorHandle");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await authDB.checkUser(username, password);
      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Passport Routes
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      throw new BadRequestError("Erro do Servidor Interno");
    }

    if (!user) {
      throw new UnauthorizedError("Credenciais inválidas");
    }

    return res.json(user);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      throw new BadRequestError("Falha no Logout");
    }

    res.status(200).json({ message: "Logout bem-sucedido" });
  });
});

module.exports = router;
