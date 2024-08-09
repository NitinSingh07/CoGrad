import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token =
    req?.cookies?.access_token ||
    req.header("Authorization")?.replace("Bearer ", "");
  // console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      console.log("Token verification error:", err);
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user;
    // console.log("User:", user);

    next();
  });
};

export default auth;
