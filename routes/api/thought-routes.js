const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById, 
    addThought, 
    removeThought, 
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

//Post and Get all thoughts
// /api/thoughts/
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// Get thought by Id, Put thought, Delete thought
// /api/thoughts/:thoughtId
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

//Post a reactions   /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

//Delete a reaction   /api/thoughts/:thoughtId/reactions/reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);
module.exports = router;