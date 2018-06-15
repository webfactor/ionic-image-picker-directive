import { Component } from '@angular/core';
import { CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { ImageServiceProvider } from '../../providers/image-service';

@IonicPage()
@Component({
  selector: 'page-image-picker-modal',
  templateUrl: 'image-picker-modal.html'
})
export class ImagePickerModalPage {
  exampleImageUrl: String = '';
  infoText: String = '';
  type: String = '';
  options: CameraOptions = null;
  imageUrls: String[] = [];
  takeImageUrls: String[] = [];
  pickImageUrls: String[] = [];
  allImageUrls: String[] = [];

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private imageService: ImageServiceProvider
  ) {
    this.getInputs();
  }

  dismiss(data: any) {
    this.viewCtrl.dismiss(data);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  takeImage(): void {
    this.takeImageUrls = [];
    try {
      this.imageService.takeImage().then(takeImageUrl => {
        if (takeImageUrl) this.allImageUrls.push(takeImageUrl);
      });
    } catch (error) {
      console.log(error);
    }
  }

  pickImage(): void {
    this.pickImageUrls = [];
    this.imageService.pickImage().then(
      pickImageUrl => {
        let oldImageIndex = this.allImageUrls.length > 0 ? this.allImageUrls.length : 0;
        let pickImageUrlIndex = 0;
        for (let i = 0 + oldImageIndex; i < pickImageUrl.length + oldImageIndex; i++) {
          this.allImageUrls[i] = pickImageUrl[pickImageUrlIndex];
          pickImageUrlIndex++;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteImage(imageUrl: String): void {
    this.allImageUrls.splice(this.allImageUrls.indexOf(imageUrl), 1);
  }

  getInputs(): void {
    this.exampleImageUrl = this.navParams.data.exampleImageUrl;
    this.infoText = this.navParams.data.infoText;
    this.type = this.navParams.data.type;
    this.options = this.navParams.data.options;
  }
}
