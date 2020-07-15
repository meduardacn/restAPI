const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../auth');
const config = require('../config');
const rjwt = require('restify-jwt-community');

module.exports = server => {
    //Register User
    server.post('/register', async (req, res, next) => {
        const { email, password } = req.body; 
        try{
            const user = await User.findOne({ email: email });
            if(user) return next(new errors.ResourceNotFoundError(`${email} is already in use`));
        }catch(err){
        }
        
        const user = new User({
            email,
            password
        });

        bcrypt.genSalt(10,(err, salt)=>{
            bcrypt.hash(user.password, salt, async (err, hash) => {
                user.password = hash;
                try{
                    await user.save();
                    res.send(user);
                    next();
                } catch(err){
                    return next(new errors.InternalError(err.message));
                }
            })
        });
    });

    //Auth User
    server.post('/signIn',async (req, res, next) => {
        const {email, password} = req.body;
        try {
            //Authenticate User
            const user = await auth.authenticate(email,password);

            // create JWT
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn: '15m'
            });

            // respond with token
            const {iat, exp } = jwt.decode(token);
            res.send({ iat, exp, token });

            next();
        } catch (err) {
            //User unauthorized
            return next(new errors.UnauthorizedError(err));
        }
    });


    server.post('/userInformations',
    rjwt({ secret: config.JWT_SECRET }),
    async (req,res, next) => {
        const { email } = req.body;
        console.log(email);
        try {
            const user = await User.findOne({ email: email });
            res.json(user);
            return next()
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There's no informations`));
        }
    });

}