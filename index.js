import express from "express";
import expressValidation from "./routes/expressValidation.js";
import mongoose from "mongoose";
import session from "express-session";

import userSchema from "./schemas/userSchema.js";

mongoose
  .connect(
    "mongodb+srv://rt8tyagi4366:IoXd37AonCqj0ipV@universal.vohiouy.mongodb.net/"
  )
  .then((e) => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("err", err.message);
  });

const app = express();
app.use(express.json());
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "BVJHDBGUIFDBVHOD",
  })
);

//express sessions

app.post("/cart/items", (req, res) => {
  res.send(req.sessionID);
});
// express validator
// app.use("/user", expressValidation);

app.post("/user/add", async (req, res) => {
  const user = new userSchema(req.body);
  try {
    await user.save();
  } catch (error) {
    res.status(400).send({ err: error.title });
    console.log("error", error);
    return;
  }

  res.status(200).send({ response: user });
});
app.get("/user/get", async (req, res) => {
  try {
    const { username, password } = req.query;
    const user = await userSchema.findOne({ username });

    if (!user) return res.status(400).send({ msg: "user nor found" });

    const checkedUser = user.checkPasswordAndReturnUser(password);
    if (checkedUser) return res.send({ user: checkedUser });
    else {
      res.status(400).send({ msg: "incorrect password" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ msg: "something went wrong" });
  }
});
// 👉 error handeling for  query params

app.listen(5000, () => {
  console.clear();
  console.log("Server running on port 5000");
});
