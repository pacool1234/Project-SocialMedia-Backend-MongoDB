const express = require("express");
const CommentController = require("../controllers/CommentController");
const { authentication, isCommentAuthor } = require("../middlewares/authentication");
const { uploadCommentImg } = require("../middlewares/upload");
const router = express.Router();

router.get("/getall", CommentController.getAll);
router.post("/create/:postid", authentication, uploadCommentImg.single("image"), CommentController.create);
router.delete("/delete/:_id", authentication, isCommentAuthor, CommentController.delete);
router.put("/update/:_id", authentication, isCommentAuthor, uploadCommentImg.single("image"), CommentController.update);
router.put("/likeComment/:_id", authentication, CommentController.likeComment);

module.exports = router;
