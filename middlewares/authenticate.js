const { HttpError } = require("../helpers/httpError");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user-schema");

const authenticate = (req, res, next) => {
  const { authorization = "" } = req.headers; // ="" - значення за замовченням,  для того якщо не передадуть токен в authorization буде undefind і split від undefined -- помилка.
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  const { JWT_SECRET } = process.env;
  console.log(token, JWT_SECRET);
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = User.findById(id);
    if (!user) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
