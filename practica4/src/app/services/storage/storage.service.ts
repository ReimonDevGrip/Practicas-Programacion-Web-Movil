import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private http = inject(HttpClient);
  private imgbbApiKey = '90d2ffbffe20edc3286f0c0958eb627a';
  private storage = getStorage();

  constructor() { }

  async uploadBase64Image(base64: string): Promise<string> {
    const formData = new FormData();
    const pureBase64 = base64.split(',')[1];

    formData.append('image', pureBase64);

    try {
      const response = await firstValueFrom(
          this.http.post<any>(`https://api.imgbb.com/1/upload?key=${this.imgbbApiKey}`, formData)
      );
      return response.data.url;
    } catch (error) {
      console.error('Error subiendo imagen a ImgBB:', error);
      throw error;
    }
  }
}