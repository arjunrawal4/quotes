const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
// All your handlers here...
var db

MongoClient.connect('mongodb://admin:root@ds111529.mlab.com:11529/arjunrawal4-mongodb', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
   // find all documents in collection
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})
