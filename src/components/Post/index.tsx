import { format, formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { useState } from "react";

import { Avatar } from "../Avatar";
import { Comment } from "../Comment";
import styles from "./Post.module.css";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link" | "hashtag";
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType
}

export const Post = ({ post }: PostProps) => {
  const [comment, setComment] = useState<string[]>([]);
  const [newCommentText, setNewCommentText] = useState("");

  const isNewCommentEmpty = !newCommentText.trim().length;

  // "d 'de' LLLL 'às' HH:mm'h'" => de acordo com a documentação
  const publishedDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBr,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
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

  const deleteComment = (commentToDelete: string) => {
    const commentsWithoutDeleteOne = comment.filter(
      (comment) => comment !== commentToDelete
    );
    setComment(commentsWithoutDeleteOne);
  };

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((line, index) => {
          return line.type === "paragraph" && <p key={index}>{line.content}</p>;
        })}

        {post.content.map((line, index) => {
          return (
            line.type === "link" && (
              <p key={index}>
                <a href="#">{line.content}</a>
              </p>
            )
          );
        })}

        {post.content.map((line, index) => {
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
