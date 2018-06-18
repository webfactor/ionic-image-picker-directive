import { Component } from '@angular/core';
import { CameraOptions } from '@ionic-native/camera';
import { ImagePickerOptions } from '@ionic-native/image-picker';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '@webfactor/ionic-alert-service';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { ModalText } from '../../model/modalText';
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
  modalText: ModalText = {
    title: 'Bilder auswählen',
    pickImageButton: 'Bild auswählen',
    takeImageButton: 'Bild machen',
    alertTitle: 'Bilder ok?',
    alertMessage: 'Ist die Qualität der/des Bild(es) in Ordnung?'
  };

  optionsTakeImage: CameraOptions = null;
  optionsImagePicker: ImagePickerOptions = null;
  showSecurityQuestion: boolean = true;

  allImageUrls: String[] = [];

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private imageService: ImageServiceProvider,
    private alertService: AlertService,
    protected translate: TranslateService
  ) {
    this.getInputs();
  }

  protected dismiss(data: any) {
    this.viewCtrl.dismiss(data);
  }

  protected cancel() {
    this.viewCtrl.dismiss();
  }

  private takeImage(): void {
    try {
      this.imageService.takeImage(this.optionsTakeImage).then(takeImageUrl => {
        if (takeImageUrl) this.allImageUrls.push(takeImageUrl);
      });
    } catch (error) {
      console.log(error);
    }
  }

  protected pickImage(): void {
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

  protected acceptImage(): void {
    if (this.showSecurityQuestion) {
      this.alertService.confirm(this.modalText.alertMessage, this.modalText.alertTitle).then(
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

  protected deleteImage(imageUrl: String): void {
    this.allImageUrls.splice(this.allImageUrls.indexOf(imageUrl), 1);
  }

  private getInputs(): void {
    this.exampleImageUrl = this.navParams.data.exampleImageUrl;
    this.infoText = this.navParams.data.infoText;
    this.optionsTakeImage = this.navParams.data.optionsTakeImage;
    this.optionsImagePicker = this.navParams.data.optionsImagePicker;
    this.modalText = this.navParams.data.modalText;
    this.type = this.navParams.data.type;
    this.showSecurityQuestion = this.navParams.data.showSecurityQuestion;
  }
}
