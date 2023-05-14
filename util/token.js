const jwt = require('jsonwebtoken');

const checkToken = async (token, id, key) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  };

const setToken = async (id, key) => {
    console.log(id);
    if(id){
        return jwt.sign({id }, key, { expiresIn: 28000});
    }
    return false;
};

module.exports = {
    checkToken,
    setToken,
};