const postsData = require('../repository/comuns.repository');

exports.getPosts = function (){
    return postsData.getPosts();
};