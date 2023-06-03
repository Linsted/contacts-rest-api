const { HttpError } = require("../helpers/httpError");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user-schema");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers; // ="" - значення за замовченням,  для того якщо не передадуть токен в authorization буде undefind і split від undefined -- помилка.
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  const { JWT_SECRET } = process.env;
  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
