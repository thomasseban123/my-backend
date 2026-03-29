const express = require("express")
const Database = require("better-sqlite3")
const cors = require("cors")

const app = express()
const db = new Database("mydb.sqlite")

app.use(cors())
app.use(express.json())

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER
  )
`)

app.get("/users", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all()
  res.json(users)
})

app.post("/users", (req, res) => {
  const { name, age } = req.body
  db.prepare("INSERT INTO users (name, age) VALUES (?, ?)").run(name, age)
  res.json({ message: "User added!" })
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})

// CI/CD test
