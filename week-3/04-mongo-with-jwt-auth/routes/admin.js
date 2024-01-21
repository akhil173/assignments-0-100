const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
// const signupMiddleware = require("../middleware/signup");
const jwt = require("jsonwebtoken");
const JWT_PASSWORD = require("../config.json")["jwt-password"];
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  username = req.body.username;
  password = req.body.password;

  const user = await Admin.findOne({ username: username });
  console.log(user);
  if (user) {
    return res.json({ message: "User already exists" });
  }
  await Admin.create({
    username: username,
    password: password,
  });
  res.json({
    message: "User created Succesfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const user = await Admin.findOne({ username: username, password: password });
  console.log(user);
  if (user) {
    const token = jwt.sign({ username: username }, JWT_PASSWORD);
    return res.json({
      message: "Signed in succesfully",
      token: token,
    });
  }

  return res.json({
    message: "Invalid credentials",
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  // Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const newCourse = await Course.create({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
    published: true,
  });

  res.json({
    message: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const response = await Course.find({});
  const responseArray = response.map((element) => {
    return {
      id: element._id,
      title: element.title,
      description: element.description,
      price: element.price,
      imageLink: element.imageLink,
    };
  });
  res.json({
    courses: responseArray,
  });
});

module.exports = router;
