import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "../Avatar";
import styles from "./Comment.module.css";

export const Comment = ({ content, onDeleteComment }) => {
  const [likes, setLikes] = useState(0);

  const handleDeleteComment = () => {
    onDeleteComment(content);
  };

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/humbertoSilv.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong>
              <time title="11 de Maio às 08:13h" dateTime="">
                Cerca de uma 1h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={20} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          {/* Sempre  que for atualizar uma info e essa info depende do valor que ela tinha anteriormente
            setLikes((state) => {
              return state + 1
            })
          
          */}
          <button
            onClick={() => {
              setLikes(likes + 1);
            }}
          >
            <ThumbsUp size={20} />
            Aplaudir
            <span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
