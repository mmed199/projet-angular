let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClassSchema = Schema({
    id: String,
    name:String,
    promo:String,
    etudiants:[{
        firstName:String,
        lastName:String,
        email:String
    }]
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Class', ClassSchema);