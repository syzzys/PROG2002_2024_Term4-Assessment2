const express = require('express')
const app = express()
const port = 3000
const { getMysqlConnection } = require('./db/crowdfunding_db')

const connection = getMysqlConnection()

app.get('/activeFundraisers', (req, res) => {
  connection.execute(
    'SELECT * FROM fundraiser WHERE active=True',
    function (err, results, fields) {
      if (err) console.log(err)
      res.json(results)
    }
  );
})

app.get('/categories', (req, res) => {
  connection.execute(
    'SELECT * FROM category',
    function (err, results, fields) {
      if (err) console.log(err)
      res.json(results)
    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
