const multer = require('multer')
let Course = require('../model/course')


// MULTTER FOR SAVING FILES
var DIR = './uploads/';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
var upload = multer({ storage: storage }).single('avatar')



// ADD A POST AND SAVE THE FILE TO /uploads
function postCourse(req, res) {
  var path = '';
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(422).send("an Error occured")
    }  
    path = req.file.path;
    let course = new Course(JSON.parse(req.body.course))
    
    course.save(err => {
      if(err){
        res.json({
            error : true,
            message : 'cant post course'
        })
      }

      res.json({
          error : false,
          message : 'course added',
          course: course
      })
    })
  })
}


// GET A LIST OF COURSES
function getCourses(req, res) {
  let classe = req.query.classe
  if(classe != null) {
    Course.find({classe: classe}, (err, courses) => {
      if(err){
        res.json({error : true, message : err})
      }
      res.send(courses)
    })
  } else {
    Course.find((err, courses) => {
      if(err){ 
        res.json({ error : true, message : err})
      }
      res.send(courses)
    })
  }
}

//UPDATE A COURSE
function updateCourse(req, res) {
  c = new Course(req.body)

  req.body.assignments.forEach((e, i) => {
    console.log()
    date = e.dateDeRendu.month + "/" + e.dateDeRendu.day + "/" + e.dateDeRendu.year
    c.assignments[i].dateDeRendu = new Date(date)
  })
  
  Course.findByIdAndUpdate(req.body._id, c, {new: true}, (err, course) => {
      if (err) {
          console.log(err);
          res.json({error : true, message : err})
      } else {
        res.json({error : false, course : course})
      }
  });
}


//DELETE A COURSE
function deleteCourse(req, res) {
  let courseId = req.body.id || req.params.id; 
  console.log(courseId)
  Course.deleteOne({_id: courseId}, (err, c) => {
      if(err){res.send(err)}
      res.json(c);
  })
}

module.exports = { updateCourse, postCourse, getCourses, deleteCourse }