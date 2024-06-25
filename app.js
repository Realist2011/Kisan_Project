const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const hbs = require("hbs");
const users = require("./models/kisan");
const mongoose = require("mongoose");
const products = require("./models/products");
const seller = require("./models/seller");
require("dotenv").config();
const passport = require("passport");
app.use(
  require("express-session")({
    secret: "keyboard dog",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
const bcrypt = require("bcrypt");
app.use(passport.session());
require("./authentication/passport");

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "hbs");
app.use(
  require("express-session")({
    secret: "keyboard dog",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    },
  })
);

// app.use(async (req, res, next) => {
//   try {
//     let user = await users.findOne({ name: 'tanushk nirmal' })
//     req.user = user
//     next()
//   } catch (err) {
//     next(err)
//   }
// })

const homerouter = require("./routes/home");

app.get("/user/login", (req, res, next) => {
  if (req.user) return res.redirect("/");
  res.render("login");
});
app.use(express.static(__dirname));
app.post(
  "/user/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    console.log(req.user._id);
    res.redirect("/user/products/all");
  }
);

// app.get('/logout',function(req,res,next){
//   req.logout(function(err){
//     if(err){return next(err)}
//     res.redirect('/auth/google')
//   })
// })

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  function (req, res) {
    res.redirect("/user/products/all");
  }
);
app.get("/product/search/:category", async (req, res) => {
  let cat = req.params.category;
  const prod = await products.find({
    category: cat,
  });
  res.render("users/products-list", { products: prod });
});
app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("you have been logged Out successfully");
    res.redirect("/");
  });
});

// app.get('/google/logout',(req,res)=>{

// })

const userRouter = require("./routes/user");
hbs.registerPartials(__dirname + "/views/partials");
const adminRouter = require("./routes/admin");

app.use("/", homerouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

/*app.get("/", (req, res) => {
  const { name } = req.query;
  res.send(`Hey mofo ${name}`);
});*/

app.post("/register", async (req, res) => {
  const { password, username, phone, Email, city, country, address } = req.body;
  let ar = [username, password, phone, Email, city, country, address];
  // res.send(pswd);

  res.render("index", { data: ar });
  // if (u) {
  //   console.log("Registered as a user");
  // } else if (a) {
  //   console.log("Registered as an admin");
  // }

  await users.create({
    username,
    password,
    phone,
    Email,
    city,
    country,
    address,
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
app.post("/search/product", async (req, res) => {
  const { search } = req.body;
  if (!search) {
    res.redirect("/");
  }
  const searchRegex = new RegExp(search, "i");
  const prod = await products.find({
    category: { $regex: searchRegex },
  });
  res.render("users/products-list", { products: prod });
});
app.get("/seller", async (req, res) => {
  res.render("./admin/Joinasseller");
});
app.post("/seller", async (req, res) => {
  const { Location, bank, AC_no, bank_branch } = req.body;
  const sellers = await seller.create({
    Location,
    bank,
    AC_no,
    bank_branch,
  });
  req.user.isseller = true;
});
mongoose.connect("mongodb://127.0.0.1:27017/KisanCart").then(() => {
  app.listen(PORT, () => {
    console.log(`https ${PORT}`);
  });
});
