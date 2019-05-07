const db = require('../core/db');


module.exports = db.model('Product', {
    title: String,
    description: String,
});
