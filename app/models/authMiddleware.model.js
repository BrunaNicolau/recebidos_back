function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login?fail=true");
}


module.exports = authenticationMiddleware;
