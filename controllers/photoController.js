const Photo = require("../models/Photo");

const fs = require("fs");
const path = require("path");
const { dirname } = require("path");
exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1;
  const photosPerPage = 2;
  const totalPhotos = await Photo.find().countDocuments();

  const photos = await Photo.find({})
    .sort("-insertDate")
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);
  //const photos={id:1,name :'Phota 1',description:'Description 1'}
  // res.sendFile(path.resolve(__dirname,'temp/index.html'))
  res.render("index", { photos: photos ,current:page,pages:Math.ceil((totalPhotos/photosPerPage))});
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", { photo: photo });
};
exports.createPhoto = async (req, res) => {
  let sampleFile = req.files.image;
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadPath = __dirname + "/../public/uploads/" + sampleFile.name;
  sampleFile.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + sampleFile.name,
    });
  });
  res.redirect("/");
};

exports.updatePhoto = async (req, res) => {
  let id = req.params.id;
  const photo = await Photo.findOne({ _id: id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${id}`);
};

exports.deletePhoto = async (req, res) => {
  let id = req.params.id;
  const photo = await Photo.findOne({ _id: id });
  let deletedImage = __dirname + "/../public" + photo.image;
  fs.unlinkSync(deletedImage);
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${id}`);
};

// exports.updatePhoto = async (req, res) => {
//   let id = req.params.id;
//   const photo = await Photo.findOne({ _id: id });
//   res.render("edit", { photo });
// };
