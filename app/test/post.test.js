const axios = require('axios');

test('should get posts', async function (){
    const res = await axios ({
        url: 'http://localhost:3000/posts',
        method: 'get'
    }); 
   const posts = (res.data);
   expect(posts).toHaveLength(3);
});