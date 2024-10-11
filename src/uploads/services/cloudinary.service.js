import {v2 as cloudinary} from 'cloudinary';
import {envsPlugin} from "../../config/plugins/envs.plugin.js";

export class CloudinaryService {
  constructor(openaiService) {
    cloudinary.config({
      cloud_name: envsPlugin.CLOUDINARY_CLOUD_NAME,
      api_key: envsPlugin.CLOUDINARY_API_KEY,
      api_secret: envsPlugin.CLOUDINARY_API_SECRET
    });
    this.openaiService = openaiService;
  }

  async uploadImage({file}) {
    const respCloudinary = await cloudinary
      .uploader
      .upload(file.tempFilePath, {
        folder: 'halloween-hackathon',
      });

    const taggingResult = await fetch(`https://api.imagga.com/v2/tags?image_url=${respCloudinary.secure_url}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${envsPlugin.IMAGGA_API_TOKEN}`
      }
    });

    const {result: {tags}} = await taggingResult.json();

    const keywords = tags.map(element => element.tag.en);

    const {prompt, story} = await this.openaiService.getHorrorStory({keywords});


    const imageModified = cloudinary.image(respCloudinary.public_id, {
      effect: `gen_background_replace:prompt_an ${prompt}`,
    });

    const regex = /src=['"]([^'"]*)['"]/;
    const urlModified = imageModified.match(regex)[1];


    return {
      image: urlModified,
      url: respCloudinary.secure_url,
      public_id: respCloudinary.public_id,
      story,
      prompt,
      tags,

    };
  }
}