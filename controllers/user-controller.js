import Thought from '../models/Thought.js'
import User from '../models/User.js'

export const getAllUser = async function (req, res) {
  // get all users using find method
 User.find({})
    .populate({
      path: "friends",
      select: "-__v",
    })
    .select("-__v")
    .sort({ _id: -1 })
    .then((users) => res.json(users))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
}

export const getUserById = async function (req, res) {
  const params = req.params
  // get one user using findOne method
 User.findOne({ _id: params.id })
    .populate({
      path: "thoughts",
      select: "-__v",
    })
    .populate({
      path: "friends",
      select: "-__v",
    })
    .select("-__v")
    .then((users) => {
      if (!users) {
        return res
          .status(404)
          .json({ message: " There is no user found with this id!" });
      }
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
}

export const createUser = async function (req, res) {

  const body = req.body
  const username = req.body.username
  const check = await User.findOne({ username: username });

  if (check) {
    res.json({ message: "Unsuccessful operation, beacuse username already exist !" });
  }

  else {
    // create user using create method
    User.create(body)
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  }
}

export const updateUser = async function (req, res) {
  const body = req.body
  const params = req.params
  // update user using findOneAndUpdate method
 User.findOneAndUpdate({ _id: params.id }, body, {
    new: true,
    runValidators: true,
  })
    .then((users) => {
      if (!users) {
        res.status(404).json({ message: " There is no user found with this id!" });
        return;
      }
      res.json(users);
    })
    .catch((err) => res.json(err));
}

// BONUS: get ids of user's delete that user and related`thoughts` and delete them all
export const deleteUser = async function (req, res) {

  const params = req.params

  // delete user using findOneAndDelete method
 User.findOneAndDelete({ _id: params.id })
    .then((users) => {
      if (!users) {
        return res.status(404).json({ message: " There is no user with this id!" });
      }
      // BONUS: get ids of user's delete that user and related`thoughts` and delete them all
      // using $in to find specific things
      return Thought.deleteMany({ _id: { $in: users.thoughts } });
    })
    .then(() => {
      return res.json({ message: "User and associated thoughts deleted!" });
    })
    .catch((err) =>{
      return  res.json(err)
    });
}


export const getFriend = async function (req, res) {

  const params = req.params
  // find user's friend using findOne method
 User.findOne(
    { _id: params.userId, friends: params.friendId }
  )
    .then((users) => {
      if (!users) {
        res.status(404).json({ message: " There is no user with this id" });
        return;
      }
      res.json({ "users": users });
    })
    .catch((err) => res.json({ "err": err }));
}


export const addFriend = async function (req, res) {

  const params = req.params
  // add user's friend using findOneAndUpdate method
 User.findOneAndUpdate(
    { _id: params.userId },
    { $addToSet: { friends: params.friendId } },
    { new: true, runValidators: true }
  )
    .then((users) => {
      if (!users) {
        res.status(404).json({ message: " There is no user with this id" });
        return;
      }
      res.json(users);
    })
    .catch((err) => res.json(err));
}


export const removeFriend = async function (req, res) {

  const params = req.params
  // remove user's friend using findOneAndUpdate method
 User.findOneAndUpdate(
    { _id: params.userId },
    { $pull: { friends: params.friendId } },
    { new: true }
  )
    .then((users) => {
      if (!users) {
        return res.status(404).json({ message: " There is no user with this id!" });
      }
      res.json(users);
    })
    .catch((err) => res.json(err));
}


