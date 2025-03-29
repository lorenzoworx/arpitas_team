import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeminiService } from './gemini.service';
import { NgFor, NgIf } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front-end';
  response : any;
  cats : any;
  selectedFile: File | null = null;
  base64textString: string = '';
  advice: any;


  constructor (private gemServ : GeminiService){
    // gemServ.postApiCall().pipe(take(1)).subscribe(d=>{
    //   this.response = d?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'NULL'
    //   console.log(this.response)
    // });
    // console.log(this.response)
  }


  onFileSelected(evt : any){
    var files = evt.target.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

alter : any;


_handleReaderLoaded(readerEvt : any) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          this.doGeminiCall(btoa(binaryString))
  }

  doGeminiCall(fileString : string) {

    let data = {
      "contents": [{
        "parts":[
            {"text": "list the items in this receipt and their cost. use '@' to separate item name and price. Use '|' to separate each entry. NO EXTRA TEXT"},
            {
             "inline_data": {
                "mime_type":"image/jpeg",
                "data": fileString
              }
            }
        ]
      }]
    }
    let dataTwo = {
      "contents": [{
        "parts":[
            {"text": "list the items in this receipt into different categories and money spent in each category. use '@' to separate category name and price. Use '|' to separate each entry. NO EXTRA TEXT"},
            {
             "inline_data": {
                "mime_type":"image/jpeg",
                "data": fileString
              }
            }
        ]
      }]
    }
    let dataThree = {
      "contents": [{
        "parts":[
            {"text": "In less than 500 characters, give financial advice based on the receipt. NO EXTRA TEXT"},
            {
             "inline_data": {
                "mime_type":"image/jpeg",
                "data": fileString
              }
            }
        ]
      }]
    }
    
    let data4 = {
      "contents": [{
        "parts":[
            {"text": "In less than 500 characters, Provide Cheaper Alternatives for the products bought. NO EXTRA TEXT"},
            {
             "inline_data": {
                "mime_type":"image/jpeg",
                "data": fileString
              }
            }
        ]
      }]
    }
    this.gemServ.postApiCall(data).pipe(take(1)).subscribe(d=>{
      let newData = d?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'NULL'
      // console.log(this.response)
      this.processText(newData)
    });
    this.gemServ.postApiCall(dataTwo).pipe(take(1)).subscribe(d=>{
      let newData = d?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'NULL'
      // console.log(this.response)
      this.processCats(newData)
    });
    this.gemServ.postApiCall(dataThree).pipe(take(1)).subscribe(d=>{
      let newData = d?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'NULL'
      this.advice = newData
    });
    
    this.gemServ.postApiCall(data4).pipe(take(1)).subscribe(d=>{
      let newData = d?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'NULL'
      // console.log(newData)
      this.alter = newData
    });
  }

  processCats(data : string){
    let listings = data.split('|').map(ele=> ele.split('@'));
    this.cats = listings
  }

  processText(data : string){
    let listings = data.split('|').map(ele=> ele.split('@'));
    this.response = listings ?? []
  }



  getAlternatives(){
    this.response?.forEach((ele:any)=>{
      this.gemServ.searchItem(ele[0]).pipe(take(1)).subscribe(ele=>{console.log(ele)})
    })
  }


  // AIzaSyBGJ1e8uHC6VZujqVumXjUehKm-gsgNJe4 api key for google search
}
