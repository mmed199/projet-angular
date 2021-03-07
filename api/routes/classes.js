let Class = require('../model/class');

// Récupérer tous les classes (GET)
function getClasses(req, res){
    Class.find((err, classes) => {
        if(err){
            res.send(err)
        }

        res.send(classes);
    });
}

// Récupérer un assignment par son id (GET)
function getClass(req, res){
    let classId = req.params.id;

    Class.findOne({id: classId}, (err, c) =>{
        if(err){res.send(err)}
        res.json(c);
    })
}

// Ajout d'une classe (POST)
function postClass(req, res){
    let c = new Class();
    c.id = req.body.id || req.params.id
    c.name = req.body.name || req.params.name
    c.promo = req.body.promo || req.params.promo
    c.etudiants = req.body.etudiants || req.params.etudiants

    console.log("POST Class reçu :");
    console.log(c.id)

    c.save( (err) => {
        if(err){
            res.json({
                error : true,
                message : 'cant post class'
            })
        }
        res.json({
            error : false,
            message : 'class added'
        })
    })
}


function deleteClass(req, res) {
    let classId = req.body.id || req.params.id; 
    Class.deleteOne({id: classId}, (err, c) => {
        if(err){res.send(err)}
        res.json(c);
    })
}

module.exports = { getClasses, postClass, getClass, deleteClass};
