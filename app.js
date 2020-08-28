const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");
const session = require("express-session")
const multer = require('multer');

// let config = {
//     secret: "Hackcommerse"
//   };

app.set("view engine", "ejs");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, () => {
	console.log(`Hackommerce App listening at http://localhost:${port}`);
});