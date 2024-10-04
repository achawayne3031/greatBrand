const Crypto = require('crypto');


   
function generateRandom(size = 20){
    return Crypto
        .randomBytes(size)
        .toString('base64')
        .slice(0, size);
   }




module.exports = {
    generateRandom: generateRandom
};