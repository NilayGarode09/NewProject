import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    const isCustomAuth = token.length < 500; // our token vs Google OAuth

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test"); // secret must match what you used in sign()
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Token is not valid" });
  }
};

export default auth;
