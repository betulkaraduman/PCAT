const express = require("express");
const path  = require('path');
const app = express();
const PORT = 3000;

//Middleware
const myMiddleware=(req,res,next)=>{
  console.log('Middleware Log 1')
  next();
}
app.use(express.static('public'))
//app.use(myMiddleware);

app.get('/',(req,res)=>{
const photos={id:1,name :'Phota 1',description:'Description 1'}
res.sendFile(path.resolve(__dirname,'temp/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server started ${PORT}`);
});