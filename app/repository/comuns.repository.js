const database = require('../config/database');

exports.getPosts = function () {
    return database.query('SELECT * FROM blog.post ORDER BY id ASC');
};