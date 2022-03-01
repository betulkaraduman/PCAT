const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const photoController = require("./controllers/photoController");
const pageController = require('./controllers/pageController')
//Middleware
const myMiddleware = (req, res, next) => {
  console.log("Middleware Log 1");
  next();
};
app.use(express.static("public"));
app.use(fileUpload());
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify:false
});

//bodydeki verileri almak için
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
//app.use(myMiddleware);

//Template engine
app.set("view engine", "ejs");

app.get("/", photoController.getAllPhotos);

app.get("/photos/:id", photoController.getPhoto);

app.post("/photos", photoController.createPhoto);

app.put("/photos/:id", photoController.updatePhoto);

app.delete("/photos/:id", photoController.deletePhoto);

app.get("/about",pageController.getAboutPage);

app.get("/add", pageController.getAddPage);

app.get("/photos/edit/:id",pageController.getEditPage);

app.listen(PORT, () => {
  console.log(`Server started ${PORT}`);
});

//templete engine ile var olan static dosyaları(html,css img..) işleriz bunun yanında elde edeceğimiz dinamik verileri de bu dosyalara gömebiliriz
