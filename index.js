const express = require('express')
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', // oder die IP-Adresse Ihres MySQL-Servers
  user: 'dan',       // Ihr MySQL-Benutzername
  password: 'secret', // Ihr MySQL-Passwort
  database: 'test_db' // Der Name Ihrer Datenbank
});

// Verbindung zur Datenbank herstellen
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Beenden Sie die Anwendung, wenn die Verbindung fehlschlägt
  }
  console.log('Connected to the database');
});

const app = express()

// Middleware für JSON-Body-Parsing
app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/connect', function (req, res) {
  res.send('connected')
})

app.get('/create-table', function (req, res) {
  const sql = `
  CREATE TABLE IF NOT EXISTS numbers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(500000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )  ENGINE=INNODB;
`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send("numbers table created");
  });
})

app.get('/insert', function (req, res) {
  const number = Math.round(Math.random() * 100)
  const sql = `INSERT INTO numbers (number) VALUES (${number})`
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.send(`${number} inserted into table`)
  });
})

app.get('/fetch', function (req, res) {
  const sql = `SELECT * FROM numbers`
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result))
  });
})

app.post('/number', (req, res) => {
  const number = req.body.number;
  if (!number) {
    return res.status(400).send('Number is required');
  }

  const sql = 'INSERT INTO numbers (number) VALUES (?)';
  db.query(sql, [number], function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.send('Number added to database');
  });
});

app.listen(3000)

console.log("listening on port 3000")

