const { db, admin } = require("../firebase");

//@desc Register a user
//@route POST /api/users/signup
//@desc Register a user
//@route POST /api/users/signup
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  console.log({ email, password });

  try {
    // Check if user with the given email already exists
    const userRecord = await admin.auth().getUserByEmail(email);

    // If user exists, prompt them to sign in
    res.status(400).json({
      error: "User already exists. Please sign in instead.",
      userRecord,
    });
  } catch (error) {
    // If user does not exist, create a new user account
    if (error.code === "auth/user-not-found") {
      try {
        const userRecord = await admin.auth().createUser({
          email,
          password,
        });

        res.json({
          message: "User signed up successfully",
          uid: userRecord.uid,
        });
      } catch (createError) {
        console.error("Error signing up user:", createError);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      console.error("Error checking user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

//@desc Register a user
//@route POST /api/users/signup
const login = async (req, res) => {
  const idToken = req.headers.authorization.split(" ")[1];
  console.log(idToken);
  try {
    // Verify the ID token sent by the client
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // console.log(decodedToken);
    // Authentication successful, respond with success message
    res.status(200).json({ message: "User logged in successfully", email: decodedToken.email });
  } catch (error) {
    // Authentication failed, respond with error message
    console.error("Error logging in user:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {
  registerUser,
  login,
};
