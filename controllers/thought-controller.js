
import Thought from '../models/Thought.js'
import User from '../models/User.js'

export const getAllThought = async function (req, res) {

  // get all thoughts using find method
   Thought.find({}).populate({
    path: "reactions",
    select: "-__v",
  })
    .select("-__v")
    .sort({ _id: -1 })
    .then((thoughts) => res.json(thoughts))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
}

export const getThoughtById = async function (req, res) {

  const params = req.params
  // get one thought using findOne method
   Thought.findOne({ _id: params.id })
    .populate({
      path: "reactions",
      select: "-__v",
    })
    .select("-__v")
    .then((thoughts) => {
      if (!thoughts) {
        return res.status(404).json({ message: " There is no thought with this id!" });
      }
      res.json(thoughts);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
}

export const createThought = async function (req, res) {
  const body = req.body
  // create thought using create method
   Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then((thoughts) => {
      if (!thoughts) {
        return res
          .status(404)
          .json({ message: "Thought created but no user with this id!" });
      }

      res.json({ message: "Thought successfully created!" });
    })
    .catch((err) => res.json(err));
}

export const updateThought = async function (req, res) {
  const body = req.body
  const params = req.params
  // update thought using findOneAndUpdate method
   Thought.findOneAndUpdate({ _id: params.id }, body, {
    new: true,
    runValidators: true,
  })
    .then((thoughts) => {
      if (!thoughts) {
        res.status(404).json({ message: " There is no thought found with this id!" });
        return;
      }
      res.json(thoughts);
    })
    .catch((err) => res.json(err));
}


export const deleteThought = async function (req, res) {
  const params = req.params
  // delete thought using findOneAndDelete method
  Thought.findOneAndDelete({ _id: params.id })
    .then((thoughts) => {
      if (!thoughts) {
        return res.status(404).json({ message: " There is no thought with this id!" });
      }
      // When the thoughts deleted from db then,remove thought id from user's `thoughts` field
      return User.findOneAndUpdate(
        { thoughts: params.id },
        { $pull: { thoughts: params.id } }, //$pull removes from an existing values that match a specified condition.
        { new: true }
      );
    })
    .then((thoughts) => {
      if (!thoughts) {
        return res.status(404).json({ message: "Thought deleted but no user with this id!" });
      }
      return res.json({ message: "Thought successfully deleted!" });
    })
    .catch((err) => {
      return res.json(err)
    });
}


export const addReaction = async function (req, res) {
  const body = req.body
  const params = req.params

  // add reaction to thought using findOneAndUpdate method
   Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $addToSet: { reactions: body } },
    { new: true, runValidators: true }
  )
    .then((thoughts) => {
      if (!thoughts) {
        return res.status(404).json({ message: " There is no thought with this id" });
      }
      return res.json(thoughts);
    })
    .catch((err) => res.json(err));
}


export const removeReaction = async function (req, res) {

  const params = req.params

  // remove reaction from thought using findOneAndUpdate method
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: params.reactionId } } },
    { new: true }
  )
    .then((thoughts) => {
     return res.json(thoughts)
    })
    .catch((err) => {
      return res.json(err)
    });
}

