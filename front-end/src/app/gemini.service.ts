import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  httpClient = inject(HttpClient);
  baseData = {
    "contents": [
      {
        "parts": [
          {
            "text": "How to use Gemini API"
          }
        ]
      }
    ]
  }
  public baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBvul2m1RDE0paN8-n2aSqorrThxhmFU-Q";
  public searchUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBGJ1e8uHC6VZujqVumXjUehKm-gsgNJe4Y&cx=017576662512468239146:omuauf_lfve&q="
  constructor() { }


  public postApiCall(data: object = this.baseData): Observable<any> {
    return this.httpClient.post(this.baseUrl,data);
  }

  public searchItem(str : string): Observable<any> {
    return this.httpClient.get(this.searchUrl+str);
  }

}
