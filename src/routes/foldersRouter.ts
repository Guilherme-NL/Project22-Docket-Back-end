import { Router } from "express";
import {
  addFolder,
  deleteFolder,
  getFolders,
} from "../controllers/foldersController.js";
import { validateToken } from "../middlewares/validateAuthorization.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";

const folderRouter = Router();

folderRouter.post("/add/folder", validateToken, addFolder);
folderRouter.get("/get/folder", validateToken, getFolders);
folderRouter.delete("/delete/:id/folder", validateToken, deleteFolder);

export default folderRouter;
