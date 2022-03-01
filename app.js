const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const PORT = 3000;
const Photo = require("./models/Photo");
const fileUpload = require("express-fileupload");
const { dirname } = require("path");
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
});

//bodydeki verileri almak için
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(myMiddleware);

//Template engine
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const photos = await Photo.find({}).sort('-insertDate');
  //const photos={id:1,name :'Phota 1',description:'Description 1'}
  // res.sendFile(path.resolve(__dirname,'temp/index.html'))
  res.render("index", { photos: photos });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", { photo: photo });
});
app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", async (req, res) => {
  let sampleFile = req.files.image;
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadPath = __dirname + "/public/uploads/" + sampleFile.name;
  sampleFile.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + sampleFile.name,
    });
  });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server started ${PORT}`);
});

//templete engine ile var olan static dosyaları(html,css img..) işleriz bunun yanında elde edeceğimiz dinamik verileri de bu dosyalara gömebiliriz
