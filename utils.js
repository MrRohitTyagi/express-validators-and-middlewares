import jwt from "jsonwebtoken";
const signature = "xxxxxyyyyyy";

export const middlewareLogger = (req, res, next) => {
  let token = req.headers.jwt_token;
  console.log("token", token);
  try {
    jwt.verify(token, signature);
  } catch (error) {
    res.status(401).send({ message: "token expired" });
  }

  next();
};
