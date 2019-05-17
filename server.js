const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();


const cookieParser = require('cookie-parser')
const url = require('url')
const dataRoute = require('./app/routes/data.route')
const authenticationRoute = require('./app/routes/authentication.route')
const verify = require('./app/controllers/auth/VerifyToken')

const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":req[header]" ":res[header]"'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.set('trust proxy', '1'); Ques esto ???????? 
// app.use(cookieParser())
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  // cookie: { 
  //   secure: true
  // }, como estamos numa ligação http não vale a pena ter isto visto que só funciona por https
}))

app.use((req, res, next) => {
  console.log(req.headers, 'headers')
  next();
}, (req, res, next) => {
  console.log(req.session, 'Params')

  let query = url.parse(req.url).query
  console.log(query)
  next()
},
  (req, res, next) => {
    console.log(req.cookie, 'cookies')
    next()
  });

app.get("/", (req, res) => {
  res.send("Back End Rafiki");
});

app.get('/teste', function (req, res) {
  res.json({ msg: 'get!' })
})

app.post('/teste', verify, function (req, res) {

  const query = url.parse(req.url).query
  const body = req.body

  console.log(body)
  res.json({ msg: 'post!' })
})
/**
 * Route para as chamadas de autenticação
 */
app.use('/auth-api', authenticationRoute)

/**
 * Route para as chamdas à base de dados
 */
app.use('/data-api', dataRoute)

module.exports = app;
