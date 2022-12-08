import { Avatar } from "@mui/material";
import classnames from "classnames";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../../core/store/current-user";
import { ChatMessage } from "../../chat.types";

import styles from "./MessagesList.module.scss";

type Props = {
  chatMessages: ChatMessage[];
};

const ChatMessagesList = ({ chatMessages }: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const messagesEndRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };


  return (
    <div className={styles.messages}>
      {chatMessages.map((message) =>
        message.senderId === currentUser.id ? (
          <div key={message.id} className={styles.sentMessage} ref={messagesEndRef}>
            <div className={classnames(styles.text, styles.send)}>
              <span>{message.content}</span>
            </div>
            <Avatar />
          </div>
        ) : (
          <div key={message.id} className={styles.receivedMessage}>
            <Avatar />
            <div className={classnames(styles.text, styles.receive)}>
              <span>{message.content}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ChatMessagesList;
