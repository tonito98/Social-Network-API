const { Schema, model } = require('mongoose');
const validators = require ('mongoose-validators') ;

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validators.isEmail()
    },
    thoughts: [
        {
       type: Schema.Types.ObjectId, 
       ref: 'Thought',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, 
    {
        toJSON: {
            virtuals:true,
            getters: true
        },
        id: false,
    }
);

// Get total number of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;