const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/user.model");
const { workerModel } = require("../Models/worker.model");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : req.headers.authorization);

    if (!token)
      return res.status(401).json({
        message: "Authentication required. No token found.",
      });

    let decode = jwt.verify(token, process.env.JWT_SECRET);

    let user = null;
    let worker = null;

    if (decode.role === 'worker') {
      worker = await workerModel.findById(decode.id).select("-password");
    } else if (decode.role === 'user') {
      user = await userModel.findById(decode.id).select("-password");
    } else {
      user = await userModel.findById(decode.id).select("-password");
      worker = !user ? await workerModel.findById(decode.id).select("-password") : null;
    }

    if (!user && !worker)
      return res.status(404).json({
        message: "Account not found",
      });

    req.user = user || worker;
    req.role = user ? "user" : "worker";
    next();
  } catch (error) {
    console.log("Error in middleware->", error);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;