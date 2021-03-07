const { Double } = require('mongodb');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CourseShema = Schema({
    name:String,
    classe:String,
    professeur:String,
    avatar:String,
    semestre:String,
    assignments: [{
        dateDeRendu: Date,
        nom: String,
        typeA:String,
        etudiants:[{
            firstName:String,
            lastName:String,
            email:String,
            note:Number,
            rendu:Boolean,    
        }]
    }] 
})
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Course', CourseShema);