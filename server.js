const app = require("./app");
const MessageModel = require('./models/Message.model')


// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.SERVER_PORT || 5005;
const { Server } = require("socket.io");


let server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});


const io = new Server(server, {

  cors: {
    origin: '*'
  }
});

//------------------SOCKET EVENTS -----------------------------


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("join_chat", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    const { content: {sender, message}, chatId } = data
    let newMessage = {
      sender: sender._id, 
      message: message, 
      conversationId: chatId
    }
    console.log('newwwww', newMessage)
    // As the conversation happens, keep saving the messages in the DB
    MessageModel.create(newMessage)
      .then((response) => {
        console.log('did we create?', response)
        socket.to(data.chatId).emit("receive_message", data.content);
      })
    
  });
});

//---------------------------------------------------------------