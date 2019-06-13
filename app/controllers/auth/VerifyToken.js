var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const secret = process.env.SECRET;
function verifyToken(req, res, next) {
  try {
    console.log(req.headers["x-access-token"], "HEADERS VERIFY TOKEN TRYYYYYY");
    var token = req.headers["x-access-token"];
    console.log("token:", token);
    if (!token) {
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, secret, function(err, decoded) {
      console.log(process.env.SECRET, "token");
      console.log(err);
      // console.log(decoded, 'decoded')
      // if (err)
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      console.log(decoded);
      console.log("Request:" + req.userId);
      next();
    });
  } catch (err) {
    // return res.status(400).send({ error: "Could not verify Token" + err });
    res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
    next();
  }
}
module.exports = verifyToken;
