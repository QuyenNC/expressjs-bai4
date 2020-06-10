// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
//using req.body
const bodyparser = require('body-parser');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//using pug
app.set('view engine', 'pug');
 app.set('views', './views');

// our default array of dreams
const dreams = [
  {title : "Đi chợ"},
  {title : "Rửa bát"},
  {title : "Nấu cơm"},
  {title : "Học code tại CodersX"}
];


app.get("/", (request, response) => {
  response.render('index',{
    todoslist : dreams 
  });
});

app.get('/todos',function(req,res){
  var q = req.query.q;
  var matchTodo = dreams.filter(function(x){
    return x.title.toLowerCase().indexOf(q.toLowerCase()) !==-1;
  })
  res.render('index',{
    todoslist : matchTodo ,
    q : q
  });
})

app.get('/create',function(req, res){
  res.render('create');
})

app.post('/todos/create',function(req, res){
  dreams.push(req.body);
  res.redirect('/');
})
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
