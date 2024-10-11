import {Router} from "express";
import {UploadService} from "../services/upload.service.js";
import {UploadController} from "../controllers/upload.controller.js";
import {AuthMiddleware} from "../../middlewares/auth.middleware.js";
import {FilesMiddleware} from "../../middlewares/files.middleware.js";
import {CloudinaryService} from "../services/cloudinary.service.js";
import {OpenaiService} from "../services/openai.service.js";

export class UploadRouter {
  static get routes() {

    const uploadRouter = Router();
    const openaiService = new OpenaiService();
    const cloudinaryService = new CloudinaryService(openaiService);
    const uploadService = new UploadService(cloudinaryService);
    const uploadController = new UploadController(uploadService);

    const {validateJWT} = AuthMiddleware;

    uploadRouter.use(validateJWT);
    uploadRouter.use(FilesMiddleware.containFiles);

    uploadRouter.post('/', uploadController.uploadImage.bind(uploadController));

    return uploadRouter;
  }
}