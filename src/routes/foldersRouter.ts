import { Router } from "express";
import {
  addFolder,
  deleteFolders,
  getFolder,
} from "../controllers/foldersController.js";
import { validateToken } from "../middlewares/validateAuthorization.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";

const folderRouter = Router();

folderRouter.post("/add/folder", validateToken, addFolder);
folderRouter.get("/get/folder", validateToken, getFolder);
folderRouter.delete("/delete/:id/folder", validateToken, deleteFolders);

export default folderRouter;
