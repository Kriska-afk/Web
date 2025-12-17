const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));

let items = [
  { id: 1, title: "Война и мир", author: "Толстой Л.Н.", year: 1873, genre: "Роман-эпопея" },
  { id: 2, title: "Мастер и Маргарита", author: "Булгаков М.А.", year: 1967, genre: "Роман" },
];

app.get("/", (req, res) => {
  const rows = items
    .map(
      (item) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.author}</td>
          <td>${item.year}</td>
          <td>${item.genre}</td>
          <td>
            <form method="POST" action="/delete/${item.id}" style="display:inline">
              <button type="submit">❌ Удалить</button>
            </form>
          </td>
        </tr>
      `
    )
    .join("");

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Таблица книг</title>
      <style>
        table { border-collapse: collapse; width: 500px; }
        td, th { border: 1px solid #ccc; padding: 8px; }
        button { cursor: pointer; }
        form { margin: 0; }
      </style>
    </head>
    <body>
      <h2>Библиотека</h2>

      <table>
        <tr>
          <th>ID</th>
          <th>Название книги</th>
          <th>Автор</th>
          <th>Год издания</th>
          <th>Жанр</th>
          <th>Действия</th>
        </tr>
        ${rows}
      </table>

      <form method="POST" action="/add">
        <h3>Добавить книгу</h3>
        <input name="title" placeholder="Название книги" required />
        <input name="author" placeholder="Автор" required />
        <input name="year" type="number" placeholder="Год издания" required />
        <input name="genre" placeholder="Жанр" required />
        <button type="submit">Добавить</button>
      </form>
    </body>
    </html>
  `);
});

app.post("/add", (req, res) => {
  items.push({
    id: Date.now(),
    title,
    author,
    year: Number(year),
    genre,
  });

  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  items = items.filter((item) => item.id !== id);

  res.redirect("/");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
