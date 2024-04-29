import cors from "cors";
import express, { json } from "express";
import { authMiddleware } from "./auth/authMiddleware";
import { endpoints } from "./logic/endpoints";
import { crudMiddleware } from "./logic/crud-middleware";

((server) => {
  try {
    server
      .use(json())
      .set("trust proxy", "linklocal")
      .use(cors())
      .use("/api/auth", authMiddleware)
      .use("/api/crud", crudMiddleware(endpoints))
      .listen(3000);
  } catch (error) {
    console.error(`Исключение: ${error}`);
  }
})(express());
