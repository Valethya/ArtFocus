import passport from "passport";
const handleErrorPassport = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, (err, user, info) => {
    // if (strategy == "register") {
    //   return next();
    // }
    if (err != null) {
      return next(err);
    }

    if (!user) {
      // const error = new Error("No hay una sesión iniciada");
      // error.code = 401;
      req.user = {};
      return next();
    }

    req.user = user;

    next();
  })(req, res, next);
};

export default handleErrorPassport;
