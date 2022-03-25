const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

//Set up a route called /api/comments/:pizzaId and use the addComment() method as a POST callback. 
// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

//Set up another route for /api/comments/:pizzaId/:commentId and use the removeComment method as a DELETE callback.
// /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;