var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('<h1>adf</h1>');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});


router.post('/upload', function(req, res){
  //This debugging meassage displays all the info that comes with the file
  console.log("Received file:\n" + JSON.stringify(req.files));
 
  //Set the directory names
  var photoDir = __dirname+"/photos/";
  var thumbnailsDir = __dirname+"/photos/thumbnails/";
  var photoName = req.files.source.name;
 
  //We use Node's FileSystem to rename the file, which actually moves it from the /tmp/ folder it goes to on Linux
  fs.rename(
    req.files.source.path,
    photoDir+photoName,
    function(err){
      if(err != null){
        res.send({error:"Server Writting No Good"});
      } else {
        //If upload goes ok we go ahead an create the thumbnail
        im.resize(
          {
            srcData:fs.readFileSync(photoDir+photoName, 'binary'),
            width:256
          }, 
          function(err, stdout, stderr){
            if(err != null){
              res.send({error:"Resizeing No Good"});
            } else {
              fs.writeFileSync(thumbnailsDir+"thumb_"+photoName, stdout, 'binary');
              res.send("Ok");
            }
          }
        );
      }
    }
  );
});

// console.log(JSON.stringify(router));

module.exports = router;
