import OpenAI from "openai";
import {envsPlugin} from "../../config/plugins/envs.plugin.js";


export class OpenaiService {

  constructor() {
    this.openai = new OpenAI({
      apiKey: envsPlugin.OPENAI_KEY
    });
  }

  async getHorrorStory({ keywords }) {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300,
      messages: [
        { role: "system", content: "Eres el mejor contador de historias del mundo. Vas a contarme una historia sobre una imagen. Lo que se ve en una imagen tu me darás una historia increíble de horror para halloween." },
        {
          role: "user",
          content: `Escribe una historia de terror en español sobre una imagen que en su contenido incluye estos
                    elementos: ${keywords.join(", ")}. La historia debe ser reveladora del secreto espeluznante que oculta la imagen o foto.
                    Usa un lenguaje intrigante que genere miedo a la persona que la lee. Máximo 300 caracteres o 3 líneas.
                    Comienza la historia basándote en la imagen que te muestro, iniciando con algo como: esta imagen tiene una alta carga energética y cuenta la historia de...
                    Pero no uses siempre el mismo comienzo, se más creativo. Cuéntame el secreto que esconde esa imagen que la historia sea de terror. Termina las historias haciendo referencia
                    a la imagen diciendo algo como: Eso logro ver y leer detrás de esta espeluznante imagen y su secreto, no uses siempre la misma frase, se creativo.
                    Luego del punto final, añade un prompt para añadir a la imagen y que esta quede más espeluznante y genere terror, que esté entre corchetes[] máximo 10 palabras para agregar al background de la imagen,
                    que sean elementos, por ejemplo: agrega fantasmas, zombies o una casa embrujada, cosas así,
                    que sea texto plano, sin tildes, ni puntuaciones, ni mayúsculas, raw text y en inglés, solo esta parte no debe tener comas, puntos, nada, solo el texto sin puntuaciones.`,
        },
      ],
    });

    const regex = /\[(.*?)\]/;
    const prompt = response.choices[0].message.content.match(regex);

    const finalStory = response.choices[0].message.content.replace(regex, "");

    return {
      story: finalStory,
      prompt: prompt ? prompt[1] : "",
    };
  }
}