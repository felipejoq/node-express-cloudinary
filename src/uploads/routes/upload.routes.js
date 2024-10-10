import { Router } from "express";
import {UploadService} from "../services/upload.service.js";
import {UploadController} from "../controllers/upload.controller.js";

export class UploadRouter {
  static get routes() {

    const uploadRouter = Router();
    const uploadService = new UploadService();
    const uploadController = new UploadController(uploadService);

    uploadRouter.get('/', uploadController.uploadImage.bind(uploadController));

    return uploadRouter;
  }
}