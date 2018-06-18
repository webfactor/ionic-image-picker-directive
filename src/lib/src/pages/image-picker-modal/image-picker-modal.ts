import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePickerOptions } from '@ionic-native/image-picker';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '@webfactor/ionic-alert-service';
import { Translatable } from '@webfactor/ionic-translatable';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { ImageServiceProvider } from '../../providers/image-service';

@IonicPage()
@Component({
  selector: 'page-image-picker-modal',
  templateUrl: 'image-picker-modal.html'
})
export class ImagePickerModalPage extends Translatable {
  title: String = 'Bilder auswählen';
  exampleImageUrl: String = '';
  infoText: String = '';
  type: String = '';
  optionsCamera: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  optionsImagePicker: ImagePickerOptions = { outputType: 0, quality: 100 };
  showSecurityQuestion: boolean = true;

  allImageUrls: String[] = [];

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private imageService: ImageServiceProvider,
    private camera: Camera,
    private alertService: AlertService,
    protected translate: TranslateService
  ) {
    super(translate);
    this.getTranslations('pickImagePage');
    this.getInputs();
  }

  dismiss(data: any) {
    this.viewCtrl.dismiss(data);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  takeImage(): void {
    try {
      this.imageService.takeImage(this.optionsCamera).then(takeImageUrl => {
        if (takeImageUrl) this.allImageUrls.push(takeImageUrl);
      });
    } catch (error) {
      console.log(error);
    }
  }

  pickImage(): void {
    this.imageService.pickImage(this.optionsImagePicker).then(
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

  acceptImage(): void {
    if (this.showSecurityQuestion) {
      this.alertService.confirm(this.translations.alertMessage, this.translations.alertTitle).then(
        () => {
          let data = { imageUrls: this.allImageUrls, type: this.type };
          this.dismiss(data);
        },
        err => {
          this.takeImage();
        }
      );
    } else {
      let data = { imageUrls: this.allImageUrls, type: this.type };
      this.dismiss(data);
    }
  }

  deleteImage(imageUrl: String): void {
    this.allImageUrls.splice(this.allImageUrls.indexOf(imageUrl), 1);
  }

  getInputs(): void {
    this.title = this.navParams.data.title;
    this.exampleImageUrl = this.navParams.data.exampleImageUrl;
    this.infoText = this.navParams.data.infoText;
    this.type = this.navParams.data.type;
    this.optionsCamera = this.navParams.data.optionsCamera;
    this.optionsImagePicker = this.navParams.data.optionsImagePicker;
    this.showSecurityQuestion = this.navParams.data.showSecurityQuestion;
  }
}
