const mongoose = require('mongoose');
const schema = mongoose.Schema;

let Mydb = new schema({
    title: { type: String },
    post:  { type: String } 
});

module.exports = mongoose.model('Mydb', Mydb);