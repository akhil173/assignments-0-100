const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const jwt = require("jsonwebtoken");
const JWT_PASSWORD = require("../config.json")["jwt-password"];
const { User, Admin, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  username = req.body.username;
  password = req.body.password;

  const user = await User.findOne({ username: username });
  const adminUser = await Admin.findOne({ username: username });

  if (user) {
    return res.json({ message: "User already exists" });
  } else if (adminUser) {
    return res.json({ message: "Admin can't create a user account" });
  }
  await User.create({
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

  const user = await User.find({
    username: username,
    password: password,
  });

  if (user) {
    const token = jwt.sign({ username: username }, JWT_PASSWORD);
    return res.json({
      message: "User signed in succesfully",
      token: token,
    });
  }

  return res.json({
    message: "Invalid credentials",
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
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

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  let courseRetrieved;
  try {
    courseRetrieved = await Course.findById(courseId);
    if (!courseRetrieved) {
      return res.json({
        message: "Invalid Course ID",
      });
    }
  } catch {
    return res.json({
      message: "Invalid Course ID",
    });
  }

  const username = req.body.username;
  const userRetrieved = await User.findOne({ username: username });

  const coursePurchasedByUser = userRetrieved.purchasedCourses.find((id) => {
    // console.log(new ObjectId(courseId) === id._id);
    return id.courseId === courseId;
  });

  if (coursePurchasedByUser) {
    return res.json({
      message: "Course already purchased",
    });
  }

  userRetrieved.purchasedCourses.push({ courseId: courseId });

  userRetrieved.save().then(() => {
    return res.json({
      message: `Course ${courseRetrieved.title} purchased succesfully`,
    });
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.body.username;
  const retrievedUser = await User.findOne({ username: username });

  if (retrievedUser.purchasedCourses.length > 0) {
    // const purchasedCourses =
    const idMap = retrievedUser.purchasedCourses.map(
      (course) => new ObjectId(course.courseId)
    );
    const courseList = await Course.find({ _id: { $in: idMap } });

    return res.json({
      message: "Courses Succesfully retrieved",
      purchasedCourses: retrievedUser.purchasedCourses,
    });
  }
  return res.json({
    message: "Sorry, You haven't purchased any courses",
  });
});

module.exports = router;
