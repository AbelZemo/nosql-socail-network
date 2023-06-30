import express from 'express'
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  getFriend,
} from "../../controllers/user-controller.js";

const router = express.Router()

// /api/users
router.get("/", getAllUser)
router.post("/", createUser)
// /api/users/:id

router.get("/:id", getUserById)
router.put("/:id", updateUser)

// BONUS: get ids of user's delete that user and related`thoughts` and delete them all
router.delete("/:id", deleteUser)

// /api/users/:userId/friends/:friendId

router.post("/:userId/friends/:friendId", addFriend)
router.delete("/:userId/friends/:friendId", removeFriend)
router.get("/:userId/friends/:friendId", getFriend)

router.get("*", function (req, res) {
  res.json({
    message: "There is no such API route",
  });
});

export default router
