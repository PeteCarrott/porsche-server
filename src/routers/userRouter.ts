import express, { Request, Response } from "express";
import User from "../entities/User";
import { getRepository } from "typeorm";
import { auth } from "../middlewares/auth";
import { createJWT } from "../utils/createJWT";

const userRouter = express.Router();

userRouter.get("/auth", auth, (req: any, res: Response) => {
  // console.log("auth section");
  console.log(req.user); // pw, token은 우선 놔둔다
  return res.json({
    id: req.user.id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    modelName: req.user.modelName,
    schoolName: req.user.schoolName,
    dept: req.user.dept,
    phone: req.user.phone,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
    success: true,
    // ...req.user,
  });
});

userRouter.post("/register", async (req: any, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("이미 유저가 존재합니다");
      return res.json({
        success: false,
      });
    }
    console.log(req.body);
    const newUser = await User.create({ ...req.body });
    const userRepository = getRepository(User);
    await userRepository.save(newUser);
    return res.json({
      success: true,
    });
  } catch (err) {
    return res.json({
      success: false,
      err,
    });
  }
});

userRouter.post("/login", async (req: any, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "해당 이메일의 사용자가 없습니다.",
      });
    }
    // console.log(user);
    const checkPassword = await user.comparePassword(password);
    if (checkPassword) {
      const token = createJWT(user.id);
      console.log(token);
      user.token = token;
      user.save();
      return res.cookie("x_jwt", token).json({
        success: true,
        userID: user.id,
      });
    }
    return res.json({
      success: false,
      message: "잘못된 비밀번호입니다.",
    });
  } catch (err) {
    return res.json({
      success: false,
      err,
    });
  }
});

userRouter.get("/logout", auth, async (req: any, res) => {
  console.log(req.user);
  const { id } = req.user;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.json({
        success: false,
        message: "로그아웃하려는 유저가 없습니다.",
      });
    }
    user.token = "";
    user.save();
    return res.json({
      success: true,
    });
  } catch (err) {
    return res.json({
      success: false,
      err,
    });
  }
});

userRouter.post("/contact", auth, async (req: any, res) => {
  try {
    const { id } = req.user;

    const user = await User.findOne({ id });
    user.modelName = req.body.modelName;
    user.schoolName = req.body.schoolName;
    user.dept = req.body.dept;
    user.phone = req.body.phone;

    const userRepository = getRepository(User);
    await userRepository.save(user);

    return res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      err,
    });
  }
});

export default userRouter;
