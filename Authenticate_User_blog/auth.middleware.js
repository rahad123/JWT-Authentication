const { verify } = require("./verify");
const { pick, every, has, partial } = require("lodash");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = getToken(req.headers, res);
  if (token) {
    const user_info = await verify(token);
    if (!user_info) return unauthorized(res);
    return next();
  }
  return unauthorized(res);
};

const getToken = (headers, res) => {
  if (headers["authorization"]) {
    return headers.authorization.split(" ")[1];
  }
  return null;
};

const unauthorized = (res) => {
  res.status(401).json({ status: "unauthorized" });
};

module.exports = authMiddleware;
