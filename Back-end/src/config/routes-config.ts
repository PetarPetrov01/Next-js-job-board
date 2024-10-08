import { Application } from "express";

import authRouter from "../routes/authRouter";
import uploadRouter from "../routes/uploadRouter";
import productsRouter from "../routes/productsRouter";

import { isUser } from "../middlewares/guards";
import wishListRouter from "../routes/wishListRouter";

export default function routesConfig(app: Application): void {
  app.use("/api/auth", authRouter);
  app.use("/api/upload", isUser(), uploadRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/wishlist", wishListRouter);
}
