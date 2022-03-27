const { Schema, model } = require('mongoose');  //We could import the entire library, but we only need the Schema constructor and the model function
const dateFormat = require('../utils/dateFormat');  //importing the dateFormat function

//creating the Schema
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    }, 
    createdBy: {
        type: String
    },

    /*
    Now, we could transform the data in the controller itself every time it gets retrieved, but just like with virtuals, Mongoose has a more elegant solution. Instead, we'll use getters to transform the data by default every time it's queried.

    In programming, a getter is typically a special type of function that takes the stored data you are looking to retrieve and modifies or formats it upon return. Think of it like middleware for your data!

    To use a getter in Mongoose, we just need to add the key get to the field we are looking to use it with in the schema. Just like a virtual, the getter will transform the data before it gets to the controller(s).

    Let's navigate to the Pizza.js comment in the models directory to implement the get option on the createdAt field. Update the createdAt field to look like the following code:


    */
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters:true
    },
    id: false    
});

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
  });

//Create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;
