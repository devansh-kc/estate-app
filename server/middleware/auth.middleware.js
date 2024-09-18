import jwt from "jsonwebtoken";

export async function AuthenticationMiddleware(req, res, next) {
  const token = req.cookie.token;
}
