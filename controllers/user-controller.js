const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate([
            { path: 'thoughts', select: '-__v'},
            { path: 'friends', select: "-__v"}
          ])
          .select('-__v')
          .then(dbUserData => {
            // If no user is found, send 404
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },

    //createUser
    createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a user
    deleteUser({ params }, res) {
         User.findOneAndDelete({_id: params.id })
           .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!'});
              return;
            }

            // BONUS: Get ids of user's `thoughts` and delete them all
            return Thought.deleteMany({ _id: { $in: dbUserData.thoughts }});
          })
           .then(() => {
            res.json({ message: "User and associated thoughts deleted!" });
           })
           .catch(err => res.status(400).json(err));
       },
    
    // Add a friend
    addFriend(req, res) {
      User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { new: true }
          )
        .then(dbUserData => {
          console.log(dbUserData);
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with that id!'});
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // Remove a friend
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        {$pull: { friends: req.params.friendId }},
        { new: true}
       )
       .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json({ message: 'No user found with that id!'});
          return;
        }
        res.json(dbUserData);
       }) 
       .catch(err => res.json(err));
    }
};

module.exports = userController;