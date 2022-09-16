const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// const ReactionSchema = new Schema(
//     {
//         // Set custom id to avoid confusion with parent comment_id
//         reactionId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId()
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             maxLength: 280
//         },
//         username: {
//             type: String,
//             required: true
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: createdAtVal => dateFormat(createdAtVal)
//         }
//     },
//     {
//         toJSON: {
//             getters: true
//         }
//     }
// );

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    // Use reactionSchema to validate data for a reaction
    // reaction: [reactionSchema]
    // },
    // {
    //     toJSON: {
    //         virtuals: true,
    //         getters: true
    //     },
    //     id: false
    }
);

// get total reaction count
// ThoughtSchema.virtual('reactionCount').get(function(){
//     return this.replies.length;
// });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;