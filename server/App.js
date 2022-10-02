const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const salt = 10

const app = express()
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: 'chat-app',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 10000000000000,
  }
}))

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'JfJf9090',
  database: 'chat-app'
})

app.get(':id/texts', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM text WHERE sender = '${id}' or reciever = '${id}';`

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

app.get('/sign-in', (req, res) => {
  res.send({ loggedIn: true, id: req.session.id, user: req.session.user })
})

app.get('/get-user/:id', (req, res) => {
  if (req.session.user) {
    const reciverUsername = req.params.id;

    const sql = `SELECT * FROM user WHERE username = '${reciverUsername}';`;

    conn.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    })
  }
})

app.post('/sign-up', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;
    const sql = `INSERT INTO user (username, password) VALUES ('${username}', '${hash}')`

    conn.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    })
  })
})

app.post('/sign-in', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const sql = `SELECT * FROM user WHERE username = '${username}'`

  conn.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      bcrypt.compare(password, result[0].password, (err, same) => {
        if (same) {
          req.session.id = result[0].id;
          req.session.user = result[0].username;
          res.send(result)
        } else {
          res.send({ message: "Invalid username/password" });
        }
      })
    }
  })
})

app.post('/send-text', (req, res) => {
  const sender = req.body.sID;
  const reciever = req.body.rID;
  const text = req.body.text;
  const date = new Date();

  const sql = `INSERT INTO text (text, date-time, sender, reciever)\
  VALUES (${text}, ${date}, ${sender}, ${reciever});`

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  })
})

const port = 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server listening on http://localhost:${port}`);
})