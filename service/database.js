const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
 
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('simon');
const userCollection = db.collection('user');
const imageCollection = db.collection('image');
 
// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}
function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function addImage({ email, date, prompt, imageUrl, s3Key }) {
  return imageCollection.insertOne({ email, date, prompt, imageUrl, s3Key });
}

function getImages(email) {
  const query = email ? { email: email } : {};
  const options = {
    sort: { date: -1 },
    limit: 20,
  };
  const cursor = imageCollection.find(query, options);
  return cursor.toArray();
}

function getUserImageCount(email) {
  return imageCollection.countDocuments({ email: email });
}

function getOldestImage(email) {
  return imageCollection.findOne({ email: email }, { sort: { date: 1 } });
}

async function deleteImage(id) {
  return imageCollection.deleteOne({ _id: id });
}
function getImagesByDate(date) {
  return imageCollection.find({ date: date }).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  addImage,
  getImages,
  getUserImageCount,
  getOldestImage,
  deleteImage,
  getImagesByDate,
};