let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let classes = require('./routes/classes');
let courses = require('./routes/courses')
let auth = require("./routes/auth")
var cors = require('cors')


let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);


// Password : QiJjY8MtKqZZM8P0
// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://dbUser:QiJjY8MtKqZZM8P0@myassignmentscluster.vw768.mongodb.net/MyAssignmentsDb?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);


app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);


app.route(prefix + '/classes')
  .get(classes.getClasses)
  .post(classes.postClass)

app.route(prefix + '/classes/:id')
  .get(classes.getClass)
  .delete(classes.deleteClass);
  //.put(assignment.updateAssignment);



app.route(prefix + '/courses')
  .post(courses.postCourse)
  .get(courses.getCourses)
  .put(courses.updateCourse)

app.route(prefix + '/courses/:id')
  .delete(courses.deleteCourse)
  

  app.use(prefix + '/auth', auth);


app.use('/static', express.static('uploads'));

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


