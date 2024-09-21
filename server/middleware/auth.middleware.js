import jwt from "jsonwebtoken";

export async function AuthenticationMiddleware(req, res, next) {
  const token = req.cookies.cookie;
  if (!token) {
    return res.status(401).json({ message: "Not Authenticated" });
  }
  const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.userId = decryptedToken.id;
  
  next();
}
