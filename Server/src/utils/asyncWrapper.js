const asyncWrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.log(err, "un error?");
    next(err);
  });
};
export default asyncWrapper;
