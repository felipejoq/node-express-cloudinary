import { Router } from 'express';
import {UploadRouter} from "../../uploads/routes/upload.routes.js";

export class AppRouter {
  static get routes() {
    const appRouter = Router();

    appRouter.use('/upload', UploadRouter.routes);

    return appRouter;
  }
}