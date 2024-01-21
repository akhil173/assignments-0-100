const jwt = require("jsonwebtoken");
const JWT_PASSWORD = require("../config.json")["jwt-password"];

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  try {
    const authString = req.headers.authorization;
    const bearerString = authString.split(" ")[0];
    const token = authString.split(" ")[1];

    if (bearerString.toLowerCase() !== "bearer") {
      return res.json({
        message: "Invalid Authentication format",
      });
    }

    decoded = jwt.verify(token, JWT_PASSWORD);
    if (decoded.username) {
      req.body.username = decoded.username;
      next();
    } else {
      return res.json({
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    return res.json({
      message: "Invalid input data",
    });
  }
}

module.exports = userMiddleware;
