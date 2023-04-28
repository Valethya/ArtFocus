import passport from "passport";
const handleErrorPassport = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, (err, user, info) => {
    console.log(err, "esto es error?");
    if (err != null) {
      return next(err);
    }
    if (!user) {
      const error = new Error("No hay una sesión iniciada");
      error.code = 401;
      return next(error);
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default handleErrorPassport;
