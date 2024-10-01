const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 3000
const { getMysqlConnection } = require('./db/crowdfunding_db')

const connection = getMysqlConnection()

app.get('/activeFundraisers', (req, res) => {
  connection.execute(
    'SELECT * FROM fundraiser LEFT JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID WHERE active=True',
    function (err, results, fields) {
      if (err) console.log(err)
      res.json(results)
    }
  );
})

app.get('/searchFundraisers', (req, res) => {
  const { ORGANIZER, CITY, CATEGORY_ID } = req.query

  connection.execute(
    `
    SELECT * FROM fundraiser 
    LEFT JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID
    WHERE active=True 
    ${ ORGANIZER ? ` AND ORGANIZER = "${ORGANIZER}"` : '' } 
    ${ CITY ? ` AND CITY = "${CITY}"` : '' } 
    ${ CATEGORY_ID ? ` AND category.CATEGORY_ID = "${CATEGORY_ID}"` : '' }
  `,
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

app.get('/fundraisers/:id', (req, res) => {
  connection.execute(
    'SELECT * FROM fundraiser LEFT JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID WHERE FUNDRAISER_ID = ?',
    [req.params.id],
    function (err, results, fields) {
      if (err) console.log(err)
      if (results.length > 0) {
        res.json(results[0])
      } else {
        res.json({})
      }
    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
