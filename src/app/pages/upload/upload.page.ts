import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Emotion, ServerResponse } from '../../interfaces/ServerResponse';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  file: File;
  base64: string | ArrayBuffer;
  emotions: string;

  response: ServerResponse;

  constructor(
    private toastCtrl: ToastController,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  changeListener($event): void {
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  uploadImage() {
    if (!this.file) {
      this.toastCtrl.create({
        message: 'Image cannot be empty.',
        duration: 3000,
        color: 'danger',
        position: 'top'
      }).then(toast => toast.present());
    }

    if (this.file) {
      const randomInt = Math.floor(
        Math.random() * (20000000 - 2000 + 1)
      ) + 2;

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.base64 = reader.result;

        const body = { 
          image: reader.result,
          name: `${randomInt}.${this.file.name.split(".")[1]}`
        };

        this.http.post<ServerResponse>('https://api.raeveen.me/rekognition/upload', { ...body } ).pipe(
          map(value => value[0]),
          tap(result => this.response = result),
          tap(result => {
            if (!result) {
              this.toastCtrl.create({
                message: "No response from AWS Rekognition. Please check if you uploaded an image of a person.",
                duration: 3000,
                position: 'top',
                color: 'danger'
              }).then(toast => toast.present());
            }
          }),
          tap(_ => {
            if (this.response && this.response.Emotions) {
              const emotionsFilter = this.response.Emotions.filter(
                (emotion: Emotion) => emotion.Confidence > 50
              );

              this.emotions = emotionsFilter.map(
                (emotion: any) => emotion.Type
              ).join(', ');
            }
          })
        ).subscribe();
      }
    }
  }

}
