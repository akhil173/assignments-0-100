function signupMiddleware(dataCollection) {
  return async function (req, res, next) {
    username = req.body.username;
    password = req.body.password;

    const user = dataCollection.findOne({ username: username });

    if (user) {
      return res.json({ message: "User already exists" });
    }
    await dataCollection.create({
      username: username,
      password: password,
    });
    next();
  };
}

module.exports = signupMiddleware;
