import {CustomError} from "../../config/errors/custom.error.js";

export class UploadService {
  async uploadImage({
    file,
    validExtensions = ['jpg', 'jpeg', 'png', 'webp'],
  }) {

    if(!file) {
      return CustomError.badRequest('No se ha enviado ningún archivo');
    }

    const fileExtension = file.mimetype.split('/').at(-1) ?? '';

    if (!validExtensions.includes(fileExtension)) {
      throw CustomError
        .badRequest(`Extensión inválida: ${fileExtension}, extensiones válidas: ${validExtensions.join(', ')}`);
    }

    return {
      ok: true
    }

  }
}