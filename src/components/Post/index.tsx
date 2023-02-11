import { format, formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { useState } from "react";

import { Avatar } from "../Avatar";
import { Comment } from "../Comment";
import styles from "./Post.module.css";

export const Post = ({ author, publishedAt, content }) => {
  const [comment, setComment] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  const isNewCommentEmpty = !newCommentText.trim().length;

  // "d 'de' LLLL 'às' HH:mm'h'" => de acordo com a documentação
  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBr,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true,
  });

  const handleCreateComment = () => {
    event.preventDefault();
    setComment([...comment, newCommentText]);
    setNewCommentText("");
  };

  const handleNewCommentChange = () => {
    setNewCommentText(event.target.value);
  };

  const deleteComment = (commentToDelete) => {
    const commentsWithoutDeleteOne = comment.filter(
      (comment) => comment !== commentToDelete
    );
    setComment(commentsWithoutDeleteOne);
  };

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line, index) => {
          return line.type === "paragraph" && <p key={index}>{line.content}</p>;
        })}

        {content.map((line, index) => {
          return (
            line.type === "link" && (
              <p key={index}>
                <a href="#">{line.content}</a>
              </p>
            )
          );
        })}

        {content.map((line, index) => {
          return (
            line.type === "hashtag" && (
              <span key={index}>
                <a href="#">#{line.content}</a>
              </span>
            )
          );
        })}
      </div>

      <form onSubmit={handleCreateComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          value={newCommentText}
          onChange={handleNewCommentChange}
          placeholder="Deixe um comentário"
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comment.map((comment, index) => {
          return (
            <Comment
              key={index}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
};
