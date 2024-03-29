var admin = require("firebase-admin");

var serviceAccount = require("./path/twitterclone-d45ec-firebase-adminsdk-ryxmo-a7068921ab.json");

try {
  // Initialize Firebase
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://twitterclone-d45ec-default-rtdb.firebaseio.com",
  });
  // const app = initializeApp(firebaseConfig);
  db = admin.firestore();
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

module.exports = {
  db,
  admin,
};
