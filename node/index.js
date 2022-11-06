const express = require('express');
const app = express();
const mysql = require('mysql');

const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const connection = mysql.createConnection(config);

const createTablePeople =
  'CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT, ' +
  'name varchar(255) NOT NULL, PRIMARY KEY (id));';
connection.query(createTablePeople);

const names = ['Ivanildo', 'Ayra', 'Manu'];

const sql = `INSERT INTO people(name) values('${
  names[Math.floor(Math.random() * names.length)]
}')`;

connection.query(sql);

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM people';
  connection.query(sql, (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      const data = results.map((data) => `<li>${data.name}</li>`);
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${data.join('')}</ul>`);
    } else {
      res.send('<h1>Full Cycle Rocks!</h1>');
    }
  });
});

app.listen(port, () => console.log(`Rodando na porta ${port}!`));
