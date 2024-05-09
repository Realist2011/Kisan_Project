const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const hbs = require("hbs");
const users = require("./models/kisan");
const mongoose = require("mongoose");
require('dotenv').config()

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "hbs");
app.use(require('express-session')({secret:'keyboard dog',resave:true,saveUninitialized:true}))
const passport = require('passport')
app.use(passport.initialize());
app.use(passport.session());
require('./authentication/passport')

app.use(async (req, res, next) => {
  try {
      let user = await users.findOne({ name: "Satvik Bajaj" });
      req.user = user;
      next()
  } catch (err) {
      next(err);
  }
})

const homerouter = require('./routes/home')

const userRouter = require('./routes/user')
hbs.registerPartials(__dirname+'/views/partials')
const adminRouter = require('./routes/admin')

app.use('/',homerouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)







/*app.get("/", (req, res) => {
  const { name } = req.query;
  res.send(`Hey mofo ${name}`);
});*/

/*app.post("/register", async (req, res) => {
  const { pswd, name, phone, Email, city, country, u, a } = req.body;
  let ar = [name, pswd, phone, Email, city, country];
  // res.send(pswd);
  res.render("index", { data: ar });
  // if (u) {
  //   console.log("Registered as a user");
  // } else if (a) {
  //   console.log("Registered as an admin");
  // }

  await users.create({
    name,
    pswd,
    phone,
    Email,
    city,
    country,
  });
  let f = await users.find({});
  console.log(f);
});
/*app.get("/abt", (req, res) => {
  res.send("Hey mofo");
}); */

/*app.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    let user = await users.findOne({ Email: email });
    if (!user) {
      return res.send("/?error=User not found");
    }
    if (await bcrypt.compare(password, user.pswd)) {
      res.send("logged in");
    } else {
      res.send("wrong Details Entered");
    }
    console.log("email:", email);
    console.log("Password:", password);
    console.log("User Password (Hashed):", user.pswd);
  } catch (e) {
    console.log(e);
  }
});*/

mongoose.connect("mongodb://127.0.0.1:27017/KisanCart").then(() => {
  app.listen(PORT, () => {
    console.log(`https ${PORT}`);
  });
});
