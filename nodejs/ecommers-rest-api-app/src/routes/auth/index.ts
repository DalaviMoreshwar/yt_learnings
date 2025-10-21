import { Router } from "express";
import { validateData } from "./../../middleware/validation.middleware";
import {
  createUsersSchema,
  loginUsersSchema,
  userTable,
} from "./../../db/userSchema";
import bcrypt from "bcryptjs";
import { db } from "./../../db/index";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const authRouter = Router();

const generateToken = (user: any) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.SECRET!,
    {
      expiresIn: "24hr",
    }
  );
};

authRouter.post(
  "/register",
  validateData(createUsersSchema),
  async (req, res) => {
    try {
      const payload = req.cleanBody;
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      const [user] = await db
        .insert(userTable)
        .values({ ...payload, password: hashedPassword })
        .returning();

      //   @ts-ignore
      delete user.password;
      const token = generateToken(user);
      res.status(201).json({ mssage: "User created!", token });
    } catch (error: any) {
      res.status(500).json({
        constraint: error.cause.constraint,
        details: error.cause.detail,
      });
    }
  }
);

authRouter.post("/login", validateData(loginUsersSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      res.status(401).json({ message: "Authentication failed!" });
      return;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      res.status(401).json({ message: "Authentication failed!" });
      return;
    }

    //  create JWT token
    const token = generateToken(user);

    //   @ts-ignore
    delete user.password;

    res.status(200).json({ token });
  } catch (error: any) {
    console.log(error);
    res.send(error);
  }
});

export default authRouter;
