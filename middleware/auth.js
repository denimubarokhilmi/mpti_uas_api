import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Token required", statusCode: 401 });

  jwt.verify(token, "project_mpti_uas", (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Invalid or expired token", statusCode: 403 });
    req.user = user;
    next();
  });
}

export { authMiddleware };
