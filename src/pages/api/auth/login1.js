import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import prisma from "../../../lib/prisma";

export default async function LoginHandler(req, res) {
  const { email, password } = req.body;

  try {
    const result = await prisma.user.findMany({
      where: {
        email: email,
        password: password,
      },
    });
    

    if (result.length > 0) {
      // expire in 30 days
      console.log("EXISTE", result);
      //console.log("EXISTENAME", result[0].name);

      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          email,
          username: result[0].name,
        },
        "secret"
      );
      console.log("TOKEN", token);

      const serialized = serialize("myTokenName", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });
      console.log("SERIALIZED", serialized);

      res.setHeader("Set-Cookie", serialized);
      return res.status(200).json({
        message: "Login successful",
      });
    }
    //no hay resultados
    console.log("No existe el usuario",result);
    return res.status(401).json({ message: "ERR_BAD_RESPONSEE" });

  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "ERROR" });
  }
}
