// imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const ejs = require('ejs');
const {uploadFile,generateSignedUrl} = require("./cloudstorage");


// configs
const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));


var multerstorage = multer.memoryStorage();
var upload = multer({ storage: multerstorage });


// Routes
app.post("/upload", upload.single("uploadedfile"), (req, res, next) => {
  const { originalname } = req.file;
  uploadFile(req.file).then(setTimeout(generateSignedUrl,20000,originalname,res));

});

app.get("/", function (req, res) {
  res.render('index');
});


// Local Server Hosting
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));