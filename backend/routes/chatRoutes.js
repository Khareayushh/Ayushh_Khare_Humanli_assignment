const express = require("express");
const validateToken = require("../middleware/userMiddleware");
const { createChats, getChats, sendMessage } = require("../controllers/chatController");

const router = express.Router();

router.post("/chats", validateToken, createChats);
router.get("/chats", validateToken, getChats);
router.post("/chats/:chatId/messages", validateToken, sendMessage);

module.exports = router;
