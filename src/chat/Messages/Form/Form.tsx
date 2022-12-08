import { Send } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import TextInput from "../../../common/components/TextInput/TextInput";
import { selectCurrentUser } from "../../../core/store/current-user";
import { addNewMessage } from "../../chat.api";
import { ChatMessage, ChatRoom } from "../../chat.types";

import styles from "./MessagesForm.module.scss";

type FormValues = {
  content: string;
};

type Props = {
  currentRoom?: ChatRoom;
  onCreateNewMessage: (message: ChatMessage) => void;
  onCreateNewChatRoom: (room: ChatRoom) => void;
};

const ChatMessagesForm = ({ currentRoom, onCreateNewMessage, onCreateNewChatRoom }: Props) => {
  const { handleSubmit, control, reset } = useForm<FormValues>();
  const currentUser = useSelector(selectCurrentUser);

  const receiver = currentRoom?.id
    ? null
    : currentRoom?.members.find((member) => member.id !== currentUser?.id);

  const submit = async (data: FormValues) => {
    try {
      if (currentRoom) {
        const resp = await addNewMessage(data.content, currentRoom?.id, receiver?.id);

        onCreateNewMessage(resp.data);
        reset();

        if (!currentRoom.id) {
          onCreateNewChatRoom(resp.data.room);
        }
      }
    } catch (err) {}
  };

  return (
    <div className={styles.footer}>
      <div className={styles.sendNewMessage}>
        <Avatar />
        <form onSubmit={handleSubmit(submit)} className={styles.form}>
          <div className="w-100">
            <TextInput
              name="content"
              control={control}
              label="Wyślij nową wiadomość"
              rules={{ required: true }}
            />
          </div>
          <IconButton type="submit" className="ms-2" color="default">
            <Send />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default ChatMessagesForm;
