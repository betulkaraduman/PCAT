const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/pcat-test-db",{
    useUnifiedTopology:true,
    useNewUrlParser:true
});

const photoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model("Photo", photoSchema);

// Photo.create({
//   title: "Photo title 1",
//   description: "Phptp description 1",
// });

// Photo.create({
//     title: "Photo title 2",
//     description: "Phptp description 2",
//   });

const id='621baee68f2eb3bd2a2d1baa';
// Photo.findByIdAndUpdate(id,{title:'updated'},{new:true},(err,data)=>{console.log(data)})
Photo.findByIdAndDelete(id,(err,data)=>{console.log("deleted")})