const { admin } = require("../firebase");

const createChats = async (req, res) => {
  const { participantId } = req.body; // ID of the other participant in the chat

  try {
    // Create a new chat document
    const chatRef = admin.database().ref("chats").push();
    const chatId = chatRef.key;

    // Add participants to the chat document
    await chatRef.set({
      participants: {
        [req.uid]: true, // Current user
        [participantId]: true, // Other participant
      },
      createdAt: Date.now(), // Timestamp of chat creation
    });

    res.json({ message: "Chat created successfully", chatId });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getChats = async (req, res) => {
  try {
    // Query all chats where the current user is a participant
    const chatsRef = admin
      .database()
      .ref("chats")
      .orderByChild(`participants/${req.uid}`)
      .equalTo(true);
    const snapshot = await chatsRef.once("value");
    const chats = snapshot.val();
    res.json(chats);
  } catch (error) {
    console.error("Error retrieving chats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body; // Message content

  try {
    // Add the message to the chat document
    const messageRef = admin.database().ref(`chats/${chatId}/messages`).push();
    const messageId = messageRef.key;

    await messageRef.set({
      content,
      sender: req.uid, // ID of the message sender
      timestamp: Date.now(), // Timestamp of message creation
    });

    res.json({ message: "Message sent successfully", messageId });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createChats,
  getChats,
  sendMessage,
};
