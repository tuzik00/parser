const mongoose = require('mongoose');
const {DATABASE} = require('../settings');

mongoose.connect(`${DATABASE.HOST}/${DATABASE.NAME}`, {useNewUrlParser: true});

module.exports = mongoose;