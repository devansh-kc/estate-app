import jwt from "jsonwebtoken";

export async function AuthenticationMiddleware(req, res, next) {
  try {
    const token = req.cookies.cookie;
    if (!token) {
      return res.status(401).json({ message: "Not Authenticated" });
    }
    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decryptedToken.id;
    
    next();

  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(403).json({ message: "Invalid or expired token", error });
  }
}
