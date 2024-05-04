const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const hbs = require("hbs");
const users = require("./models/kisan");
const mongoose = require("mongoose");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "hbs");

const userRouter = require('./routes/user')
hbs.registerPartials(__dirname+'/views/partials')
const adminRouter = require('./routes/admin')
app.use(async (req, res, next) => {
  try {
      let user = await users.findOne({ name: "Satvik Bajaj" });
      req.user = user;
      console.log(req.user)
      next()
  } catch (err) {
      next(err);
  }
})
app.use('/user',userRouter)
app.use('/admin',adminRouter)


/*app.use(async (req, res, next) => {
  try {
      let user = await users.findOne({ name: "Satvik Bajaj" });
      req.user = user;
      console.log(req.user)
      next()
  } catch (err) {
      next(err);
  }
})*/




/*app.get("/", (req, res) => {
  const { name } = req.query;
  res.send(`Hey mofo ${name}`);
});*/

/*app.post("/", async (req, res) => {
  /*let name = req.body.name;

  const { pswd, name, phone, Email, city, country,u,a } = req.body;
  let ar = [name, pswd, phone, Email, city, country];
  /*res.send(pswd);*/
  /*res.render("index", { data: ar });
  if(u){
    console.log("Registered as a user")

  }
  else if(a){
    console.log('Registered as an admin')
  }

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
});  */

mongoose.connect("mongodb://127.0.0.1:27017/KisanCart").then(() => {
  app.listen(PORT, () => {
    console.log(`https ${PORT}`);
  });
});
