const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId;

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
  client = new MongoClient(uri);
  await client.connect();
}

async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = client.db("githubclone");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await userCollection.insertOne(newUser);
    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1D" },
    );

    res.json({ token });
  } catch (err) {
    console.error("Error during signup : ", err.message);
    res.status(500).send("Server error");
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("githubclone");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid credentials !" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "Invalid credentials !" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1W",
    });
    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send("Server Error");
  }
}

async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("githubclone");
    const userCollection = db.collection("users");

    const users = await userCollection.find({}).toArray();
    res.json(users);
  } catch (err) {
    console.error("Error during fetching:", err.message);
    res.status(500).send("Server Error");
  }
}

async function getUserProfile(req, res) {
  const currentId= req.params.id;
  try{
    await connectClient();
    const db = client.db("githubclone");
    const userCollection = db.collection("users");

     const user = await userCollection.findOne({
_id:new ObjectId(currentId),

     });

     if (!user) {
      return res.status(500).json({ message: "Invalid credentials !" });
    }

      res.send(user,{message:"profile fetched !"});
  }catch (err) {
    console.error("Error during fetching:", err.message);
    res.status(500).send("Server Error");
  }

}

async function updateUserProfile(req, res) {
  res.send("Profile Updated!");
}

async function deleteUserProfile(req, res) {
  res.send("Profile deleted");
}

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
