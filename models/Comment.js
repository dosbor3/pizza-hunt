const { Schema, model, Types } = require('mongoose');   //types used to create a custom ID field
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema ({
    //set custom id field to avoid confusion with parent id field
    replyID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody: {
        type: String
    },
    writtenBy: {
        type: String
    },    
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters:true
    }
    
});

const CommentSchema = new Schema ({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    //use ReplySchema to validate data fro a reply
    replies: [ReplySchema],
},
{
    toJSON: {
        getters: true, 
        virtuals: true
    },
    id: false
});

/*
Here we'll need a unique identifier instead of the default _id field that is created, so we'll add a custom replyId field. Despite the custom field name, we're still going to have it generate the same type of ObjectId() value that the _id field typically does, but we'll have to import that type of data first.

At the top of Comment.js update the import code statement to look like this:
*/


// get total count of comments and replies on retrieval
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
  });

const Comment = model('Comment', CommentSchema);

module.exports = Comment;