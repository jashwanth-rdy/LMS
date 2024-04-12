import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./instructor.module.scss";
import MessagesRec from "../../components/MessagesRec";
import SendMessage from "../../components/SendMessage";

function Idiscuss({ socket }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const joinRoom = () => {
      if (auth?.user && id) {
        socket.emit("join_room", { username: auth?.user, room: id });
      }
    };
    joinRoom();
    return () => {
      const __createdtime__ = Date.now();
      socket.emit("leave_room", {
        username: auth?.user,
        room: id,
        __createdtime__,
      });
    };
  }, []);
  return (
    <div className="container">
      <div className={styles.chatContainer}>
        <div>
          <MessagesRec socket={socket} />
          <SendMessage socket={socket} username={auth?.user} room={id} />
        </div>
      </div>
    </div>
  );
}

export default Idiscuss;
