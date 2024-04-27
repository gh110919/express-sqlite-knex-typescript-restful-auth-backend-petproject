import cors from "cors";
import express, { json } from "express";
import { authMiddleware } from "./auth/authMiddleware";
// import { endpoints } from "./logic/endpoints";
// import { generator } from "./logic/generator";

((server) => {
  try {
    server
      .use(json())
      .set("trust proxy", "linklocal")
      .use(cors())
      .use("/api/auth", authMiddleware)
      // .use("/api", generator(endpoints))
      .listen(3000);
  } catch (error) {
    console.error(`Исключение: ${error}`);
  }
})(express());
