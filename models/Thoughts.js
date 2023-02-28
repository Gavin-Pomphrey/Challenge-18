const mongoose = require('mongoose');

// define the reaction schema as a subdocument of the Thought model
const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // define a getter method to format the timestamp
            get: (createdAtVal) => {
                return new Date(createdAtVal).toLocaleString();
            }
        }
    }
);

// define the Thought model
const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // define a getter method to format the timestamp
            get: (createdAtVal) => {
                return new Date(createdAtVal).toLocaleString();
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            // include virtual properties when data is requested
            virtuals: true,
            // remove the _id and __v properties
            getters: true
        },
        id: false
    }
);

// define a virtual to get the length of the reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the Thought model from the schema
const Thought = mongoose.model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;
