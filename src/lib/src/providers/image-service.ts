import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

@Injectable()
export class ImageServiceProvider {
  takeImageUrl: String = '';
  pickImageUrls: String[] = [];
  constructor(private camera: Camera, private imagePicker: ImagePicker) {}

  takeImage(options: CameraOptions): Promise<String> {
    try {
      return new Promise((resolve, reject) => {
        this.camera.getPicture(options).then(
          imageData => {
            this.takeImageUrl = imageData;
            resolve(this.takeImageUrl);
          },
          err => {
            reject(console.log(err));
          }
        );
      });
    } catch (error) {}
  }

  pickImage(options: ImagePickerOptions): Promise<String[]> {
    this.pickImageUrls = [];
    return new Promise((resolve, reject) => {
      this.imagePicker.getPictures(options).then(
        results => {
          for (let i = 0; i < results.length; i++) {
            this.pickImageUrls[this.pickImageUrls.length] = results[i];
          }
          resolve(this.pickImageUrls);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
