import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import "./global.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/humbertoSilv.png",
      name: "Humberto Silva",
      role: "Dev back-end",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
      { type: "hashtag", content: "doctorcare" },
      { type: "hashtag", content: "doctorcare" },
      { type: "hashtag", content: "jane.design" },
    ],
    publishedAt: new Date("2023-01-26 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/humbertoSilv.png",
      name: "Humberto Silva",
      role: "Dev back-end",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
      { type: "hashtag", content: "doctorcare" },
      { type: "hashtag", content: "jane.design" },
    ],
    publishedAt: new Date("2023-01-17 20:00:00"),
  },
  {
    id: 3,
    author: {
      avatarUrl: "https://github.com/humbertoSilv.png",
      name: "Humberto Silva",
      role: "Dev back-end",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
      { type: "hashtag", content: "doctorcare" },
      { type: "hashtag", content: "jane.design" },
    ],
    publishedAt: new Date("2023-01-18 20:00:00"),
  },
];
export const App = () => {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post, index) => {
            return (
              <Post
                key={index}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
};
