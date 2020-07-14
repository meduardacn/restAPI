const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = server => {
    //Register User
    server.post('/register', (req, res, next)=>{
        const { email , password } = req.body; 
        const user = new User({
            email,
            password
        });

        bcrypt.genSalt(10,(err, salt)=>{
            bcrypt.hash(user.password, salt, async (err, hash)=>{
                // Hash Password
                user.password = hash;
                try{
                    const newUser = await user.save();
                    res.send();
                    next();
                } catch(err){
                    return next(new errors.InternalError(err.message));
                }
            })
        });
    });
}