// This is a controller file to handle the functionality (like updates)


// Think back to how you created servers in previous applications. We've used both of the following approaches:

// Set it up so that the routes directory holds not only the routes but also the functionality for those endpoints to perform.

// Tightly follow MVC patterns and hold both the routes and functionality in a controllers directory.

//Now in NoSQL, you create a structure that separates routes and functionality completely? 
//                  functionality in controllers and the 
//                   endpoints in routes..


const { Pizza } = require('../models');

const pizzaController = {
    //get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
        .populate({ //equivalent to sequelize's join method to display the foreign key's information
            path: 'comments',
            select: '-__v' //retrieve the comments, but ignore the v field
        })
        .select('-__v') //to ignore the pizza's __v field
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //get one pizza by id
    getPizzaById({params}, res) {
        Pizza.findOne({_id: params.id})
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
            //if no pizza is found, send 404
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id. '});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //createPizza
    createPizza({body}, res) {  //destructure the body out of the req object
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    //update pizza by id
    updatePizza({ params, body }, res) {    //destructure the params and body out of the req object
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true }) //if not set to true, the original data would be returned not the updated data
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: 'No pizza found with this id'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    //remove
    deletePizza({params}, res) {
        Pizza.findOneAndDelete({_id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: 'No pizza found with this id'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;