const express = require("express");
const router = express.Router();
const authDB = require("../repository/comuns.repository");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const users = await authDB.checkUser(username, password);

      if (!users.length) {
        return done(null, false, { message: "Invalid credentials" });
      }

      const user = users[0];
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
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.json({ success: true, user });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }

    res.status(200).json({ message: "Logout successful" });
  });
});

module.exports = router;
