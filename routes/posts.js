const express = require("express");
const PostController = require("../controllers/PostController");
const router = express.Router();
const { authentication, isAuthor } = require("../middlewares/authentication");
const { uploadPostImg } = require("../middlewares/upload");

router.get("/getAll", PostController.getAll);
router.get("/getAndLimit", PostController.getTenPerPage);
router.get("/getById/:_id", PostController.getById);
router.get("/getByTitle/:title", PostController.getByTitle);
router.get("/getAllWithLikesAndComments", PostController.getAllWithLikesAndComments);
router.get("/getFriendsPosts", authentication, PostController.getFriendsPosts);
router.get("/getUsersPosts/:userId", authentication, PostController.getUsersPosts);
router.post("/create", authentication, uploadPostImg.single("image"), PostController.create);
router.put("/likePost/:_id", authentication, PostController.likePost);
router.put("/unlikePost/:_id", authentication, PostController.unlikePost);
router.put("/update/:_id", authentication, uploadPostImg.single("image"), isAuthor, PostController.update);
router.delete("/delete/:_id", authentication, isAuthor, PostController.delete);

module.exports = router;
