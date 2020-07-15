const errors = require('restify-errors');
const Restaurant = require('../models/Restaurant')

module.exports = server => {
    // get all Restaurants 
    server.get('/getAllRestaurants', async (req, res, next) => {
        try{
            const restaurants = await Restaurant.find();
            res.json(restaurants);
            next();
        } catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    // get Restaurant by id
    server.get('/restaurantWithID/:id', async (req, res, next) => {
        try {
            const restaurant = await Restaurant.findById(req.params.id);
            if (restaurant) {
                res.json(restaurant)
            } else {
                res.status(404)
                res.json({ message: 'not found for' })
            }
            return next()
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no restaurant with the id of ${req.params.id}`));
        }
    });

    // add new Restaurant 
    server.post('/addNewRestaurant', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        try {
            const restaurant = await Restaurant.create(req.body);
            // restaurant.save();
            res.send(201);
            console.log({
                coordinates: restaurant.location.coordinates
            });
            next()
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });

    // update Restaurant 
    server.put('/updateRestaurant/:id', async (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        try {
            const restaurant = await Restaurant.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(200);
            next();
        } catch(err){
            return next(new errors.ResourceNotFoundError(`There is no restaurant with the id of ${req.params.id}`));
        }

    });

    // delete a Restaurant by id
    server.del('/deleteRestaurant/:id', async (req, res, next) => {
        try {
            const restaurant = await Restaurant.findOneAndRemove({ _id: req.params.id });
            res.send(204);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no restaurant with the id of ${req.params.id}`));
        }
    });

}