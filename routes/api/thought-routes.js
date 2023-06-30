import express from 'express'
import {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from "../../controllers/thought-controller.js";

const router = express.Router()
// /api/thoughts
router.get("/", getAllThought)
router.post("/", createThought)
// /api/thoughts/:id

router.get("/:id", getThoughtById)
router.put("/:id", updateThought)
router.delete("/:id", deleteThought)

// /api/thoughts/:thoughtId/reactions

router.post("/:thoughtId/reactions", addReaction)
// /api/thoughts/:thoughtId/reactions/:reactionId

router.delete("/:thoughtId/reactions/:reactionId", removeReaction)

router.get("*", function (req, res) {
  res.json({
    message: "There is no such API route",
  });
});

export default router