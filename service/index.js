const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const db = require('./database.js');
const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const s3 = new S3Client({ region: process.env.AWS_REGION });
const BUCKET_NAME = process.env.S3_BUCKET_NAME;

app.use(express.json({ limit: '10mb' }));

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);


apiRouter.get('/daily-prompt', (_req, res) => {
  const prompts = [
    "Star Wars",
    "Bloodbath",
    "Heartbreak",
    "A Cold Autumn Morning",
    "Spring",
    "Movie Theater",
    "Darkness",
    "Joy",
    "Apathy",
    "Grocery Store",
    "Medieval",
    "Ancient",
    "Forgotten",
    "A Warm Sunset",
    "Grief",
    "Terror",
    "A Snug Shoe",
    "A fan blows against the wind",
    "Clock strikes midnight",
    "Rag on a countertop",
    "Snails",
    "Crickets",
    "Ants",
    "Rats",
    "Bats",
    "The video game minecraft",
    "The inevitable approach of death",
    "Dogs!!",
    "Cats!",
    "Eldritch Horror",
    "Pleasure",
  ];

  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const prompt = prompts[dayOfYear % prompts.length];

  res.send({ prompt });
});

apiRouter.get('/auth/me', async (req, res) => {
  const user = await db.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.post('/auth/create', async (req, res) => {
  if (await db.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await db.getUser(req.body.email);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    user.token = uuid.v4();
    await db.updateUser(user);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await db.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    await db.updateUserRemoveAuth(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await db.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Returns only the logged-in user's images
apiRouter.get('/artpieces/mine', verifyAuth, async (req, res) => {
  const images = await db.getImages(req.user.email);
  res.send(images);
});

// Returns all users' images
apiRouter.get('/artpieces', verifyAuth, async (_req, res) => {
  const images = await db.getImages();
  res.send(images);
});

apiRouter.post('/artpiece', verifyAuth, async (req, res) => {
  const { prompt, date, imageUrl } = req.body;

  try {
    const s3Url = await uploadImageToS3(imageUrl, req.user.email, date);
    await db.addImage({ email: req.user.email, date, prompt, imageUrl: s3Url });
    res.send({ msg: 'Image saved successfully' });
  } catch (err) {
    console.error('Failed to save image:', err);
    res.status(500).send({ msg: 'Failed to save image' });
  }
});


app.use(function (err, req, res, next) {
  console.log('ERROR:', err);
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


async function uploadImageToS3(base64Image, email, date) {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const mimeMatch = base64Image.match(/^data:(image\/\w+);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
  const extension = mimeType.split('/')[1];

  const key = `artpieces/${email}/${date}-${uuid.v4()}.${extension}`;

  await s3.send(new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
  }));

  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await db.addUser(user);
  return user;
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});