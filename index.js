const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const cors  = require('cors');
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('DataStorage.db', () => {
    db.run(`CREATE TABLE IF NOT EXISTS auth(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL
        )`
    // ,() => db.run(`INSERT INTO auth (name, email, password) VALUES("Sam", "Sam@Mail", "Ex")`)
    )
})


app.get('/', (req, res) => {
        res.send("Get request working...")
    })

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    db.run(`INSERT INTO auth (name, email, password) VALUES (?,?,?)`, [name, email, password], (err) => {
        if(err) console.log("the error::" + err);

        res.json({id: this.lastID, name, email, password});
    });
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    db.get(`SELECT * FROM auth WHERE email = ? AND password = ?`,[email, password], (err, user) => {
        console.log(user);
        if(err)return console.log(err);
        if(user){
            if(user.password == password) {
                res.json(user.name);
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json("No record of this user");
        }
    })
})



app.listen(PORT, () => {
    console.log("Server is running...")
})