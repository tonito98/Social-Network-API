const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById, 
    addThought, 
    removeThought 
} = require('../../controllers/thought-controller');

//Post thoughts
// /api/thoughts/
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)
    .get(getThoughtById)
    .delete(removeThought);

module.exports = router;