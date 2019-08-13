const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    avatar: { type: String, default: 'default.png'}
});

//especificar la coleccion
module.exports = mongoose.model('users',usersSchema);