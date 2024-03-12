const { admin } = require("../firebase");

const validateToken = async (req, res, next) => {
  const authToken = req.headers.authorization.split(" ")[1];
    console.log(authToken)
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  try {
    // Verify the authentication token
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    req.uid = decodedToken.uid;
    next();
  } catch (error) {
    console.error("Error verifying authentication token:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = validateToken;