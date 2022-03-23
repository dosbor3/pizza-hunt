const { Schema, model } = require('mongoose');  //We could import the entire library, but we only need the Schema constructor and the model function

//creating the Schema
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    }, 
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

//Create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;
