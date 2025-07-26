import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ResponseIA } from 'src/app/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private http = inject(HttpClient);
  private apiKey = `AIzaSyCeB-pmXN3fbzIahf1dB0Pa_3DYLiZqUu0`;
  private apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;

  constructor() {}

  async getResponse(prompt: string): Promise<ResponseIA> {
    const body = {
      system_instruction: {
        parts: [
          {
            text: 'Eres un agente de refinamiento de texto. Tu objetivo es reescribir cualquier mensaje dado en un tono formal, elegante y respetuoso, sin importar el tono original, el uso de jerga o lenguaje ofensivo. No debes censurar ni omitir contenido: en su lugar, reformúlalo con profesionalismo, preservando siempre la intención original.',
          },
        ],
      },
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            response: { type: 'STRING' },
          },
        },
      },
    };

    try {
      const response: any = await firstValueFrom(
        this.http.post(this.apiURL, body)
      );
      console.log(response);
      return (
        JSON.parse(response.candidates?.[0]?.content?.parts?.[0].text ||
        'No hubo respuesta')
      );
    } catch (error) {
      console.log('Error en la peticion: ', error);
      const err: ResponseIA = { response: 'Error en la IA' };
      return err;
    }
  }
}
