import { useState } from "react";
import "./chat.scss";
import { Cross, X } from "lucide-react";
import { apiRequest } from "../../apiRequest/apiRequest";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const [receiver, setReceiver] = useState([]);
  const currentUser = useSelector((state) => state.user.userInfo);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const text = formData.get("message");
    if (!text) return;
    try {
      const result = await apiRequest.post(`/message/${chat.chat.id}`, {
        content: text,
      });
      setChat((prev) => ({
        ...prev,
        Message: [...prev.Message, result.data.message],
      }));
      event.target.reset();
    } catch (error) {
      console.log(error);
    }
  }

  console.log(currentUser);
  console.log({ ...chat });

  async function handleOpenChat(id, receiver) {


    try {
      const result = await apiRequest(`/chats/${id}`);

      setChat({ ...result.data });
      setReceiver({ ...receiver });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>

        {chats.map((chat) => (
          <div
            style={{
              backgroundColor: chat.seenBy.includes(currentUser.id)
                ? "white"
                : "#fece514e",
            }}
            className="message"
            key={chat.id}
            onClick={() => handleOpenChat(chat.id, chat.receiver)}
          >
            <img
              src={
                chat.receiver.avatar ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              }
              alt={receiver.username}
            />
            <span>{receiver.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={
                  chat.receiver?.avatar ||
                  "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                }
                alt={receiver.username}
              />
              {receiver.username}
            </div>
            <span className="close" onClick={() => setChat((prev) => !prev)}>
              <X />
            </span>
          </div>
          <div className="center">
            {chat.chat.Message.map((message) => {
              return (
                <div
                  className="chatMessage"
                  key={message.id}
                  style={{
                    alignSelf:
                      message.userId === currentUser.id
                        ? "flex-end"
                        : "flex-start",
                    textAlign:
                      message.userId === currentUser.id ? "right" : "left",
                  }}
                >
                  <p>{message.message}</p>
                  <span>{format(message.createdAt)}</span>
                </div>
              );
            })}
          </div>
          <form className="bottom" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" placeholder="message" name="message" />
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
