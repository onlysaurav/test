const authenticateUser = (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.sendStatus(401);
    }
  };
  
  module.exports = authenticateUser;
  