const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const fs = require('fs');
const path = require('path');
const authCookieName = 'token';

let users = [];
let artPieces = [];
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json({ limit: '10mb' }));

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);


apiRouter.get('/daily-prompt', (_req, res) => {
  const prompts = fs.readFileSync(path.join(__dirname, 'prompts.txt'), 'utf8')
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== '');

  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const prompt = prompts[dayOfYear % prompts.length];

  res.send({ prompt });
});
// Checks if the cookie works.
apiRouter.get('/auth/me', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Transform later to get image json, along, with date, and prompt.
apiRouter.get('/artpieces', verifyAuth, (_req, res) => {
  res.send(artPieces);
});

apiRouter.post('/artpiece', verifyAuth, (req, res) => {
    artPieces = addArtPiece(req.body);
    res.send(artPieces);
});


app.use(function (err, req, res, next) {
    console.log('ERROR:', err);
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Needs to be updated, should check for who the user is, and if they are signed in, add the score to their list of scores.
function addArtPiece(newArtPiece) {
    artPieces.unshift({
        prompt: newArtPiece.prompt,
        date: newArtPiece.date,
        imageUrl: newArtPiece.imageUrl,
    });

    if (artPieces.length > 5) {
        artPieces.pop();
    }

    return artPieces
}
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}


async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
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
