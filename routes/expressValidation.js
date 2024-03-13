import express from "express";
import {
  param,
  body,
  query,
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";
import { uservalidationschema } from "../validationSchemas.js";
const router = express.Router();

router.get(
  "/",
  query("id")
    .isLength({ min: 3, max: 10 })
    .withMessage("Invalid Id length 3 -10"),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    res.send({ success: true });
  }
);

// 👉 error handeling for body
router.post(
  "/add",

  //   body("name")
  //     .isLength({ min: 4, max: 10 })
  //     .withMessage("Invalid name length 4 - 10"),
  //   body("password")
  //     .isLength({ min: 4, max: 10 })
  //     .withMessage("Invalid password length 4 - 10")
  //     .isAlphanumeric()
  //     .withMessage("Password must be Alphanumeric"),

  //👉 but this will make code very lengthy so we will make schemas in different file and use checkSchema function
  checkSchema(uservalidationschema),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);

    res.send({ success: true });
  }
);

//👉 error handeling for  url params
router.get(
  "/:id",
  param("id").isLength({ min: 4 }).withMessage("id mest be atleast 4 chars"),
  (req, res) => {
    console.log("req.params", req.params);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // true /false if there are errors or not
      res.status(400).send({ error: result.array() });
      return;
    }
    const passedata = matchedData(req); // allow only validated data
    res.send({ success: true });
  }
);




export default router;
