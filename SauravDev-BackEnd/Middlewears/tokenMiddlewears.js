import jwt from "jsonwebtoken";

const tokenDecoder = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided", success: false });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
    req.userId = decode.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token", success: false });
  }
};

export default tokenDecoder;
