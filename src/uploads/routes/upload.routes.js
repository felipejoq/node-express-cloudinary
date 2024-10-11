import { Router } from "express";
import {UploadService} from "../services/upload.service.js";
import {UploadController} from "../controllers/upload.controller.js";
import {AuthMiddleware} from "../../middlewares/auth.middleware.js";

export class UploadRouter {
  static get routes() {

    const uploadRouter = Router();
    const uploadService = new UploadService();
    const uploadController = new UploadController(uploadService);

    const {validateJWT} = AuthMiddleware;

    uploadRouter.get('/',[validateJWT], uploadController.uploadImage.bind(uploadController));

    return uploadRouter;
  }
}