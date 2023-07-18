const authMiddleware = (req, res, next) => {
  if ((req.session && req.session.user) || req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ error: "Session expired or user not authenticated" });
  }
};

module.exports = authMiddleware;