const jwt = require("jsonwebtoken");
const JWT_PASSWORD = require("../config.json")["jwt-password"];

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
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

module.exports = adminMiddleware;
