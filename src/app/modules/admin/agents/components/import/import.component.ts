import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
  providers: [MessageService],
})
export class ImportComponent implements OnInit {
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}
  onReady(eventData:any) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (
      loader:any
    ) {
      console.log('blob min', btoa(loader.file));
      return new UploadAdapter(loader);
    };
  }
  ngOnInit(): void {}

  onUpload(e: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
}

// export class UploadAdapter {
//   private loader;
//   constructor(loader: any) {
//     this.loader = loader;
//     console.log('class whilee changes', this.readThis(loader.file));
//   }

//   public upload(): Promise<any> {
//     //"data:image/png;base64,"+ btoa(binaryString)
//     return this.readThis(this.loader.file);
//   }

//   readThis(file: File): Promise<any> {
//     console.log(file);
//     let imagePromise: Promise<any> = new Promise(() => {
//       var myReader: FileReader = new FileReader();
//       myReader.onloadend = (e) => {
//         let image = myReader.result;
//         console.log('blob file', image);
//         return { default: 'data:image/png;base64,' + image };
//       };
//       myReader.readAsDataURL(file as Blob);
//     });
//     return imagePromise;
//   }
// }
export class UploadAdapter {
  private loader;

  constructor(loader: any) {
    this.loader = loader;
    console.log('class while changes', this.readThis(loader.file));
  }

  public upload(): Promise<any> {
    return this.readThis(this.loader.file);
  }

  readThis(file: File): Promise<any> {
    console.log(file);

    let imagePromise: Promise<any> = new Promise((resolve) => {
      var myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        if (myReader.result) {
          let image = myReader.result;
          console.log('blob file', image);
          resolve({ default: 'data:image/png;base64,' + image });
        } else {
          resolve({ default: null }); // You can adjust this accordingly if needed
        }
      };

      myReader.readAsDataURL(file as Blob);
    });

    return imagePromise;
  }
}

