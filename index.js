var express = require('express');
const multer = require('multer')
var cors = require('cors');
const fs = require('fs')

require('dotenv').config()

const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (req.file) {
    const fileData = req.file
    console.log(`Received uploaded File: ${JSON.stringify(fileData)}`)
    res.json({
      name: fileData.originalname,
      type: fileData.mimetype,
      size: fileData.size
    })
    fs.unlink('./uploads/' + fileData.filename, (error) => {
      if (error) {
        throw (error)
      }
    })
  } else {
    res.json({
      error: 'no file selected'
    })
  }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
