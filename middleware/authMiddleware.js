const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]
      ? req.headers["authorization"].split(" ")[1]
      : null;
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: "auth failed",
          err,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "auth failed",
    });
  }
};
