import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CameraOptions } from '@ionic-native/camera';
import { ImagePickerOptions } from '@ionic-native/image-picker';
import { ModalController } from 'ionic-angular';

import { ModalText } from '../model/modalText';
import { ImagePickerModalPage } from '../pages/image-picker-modal/image-picker-modal';

@Directive({ selector: 'button[wf-image-picker]' })
export class ImagePickerDirective {
  @Output() imagePick = new EventEmitter();

  @Input() exampleImageUrl?: string = '';
  @Input() infoText?: string = '';
  @Input() modalText?: ModalText = null;
  @Input() optionsCamera?: CameraOptions = null;
  @Input() optionsImagePicker?: ImagePickerOptions = null;
  @Input() showSecurityQuestion?: boolean = true;

  constructor(private modalCtrl: ModalController) {}

  @HostListener('click')
  presentPositionPickerModal() {
    let modal = this.modalCtrl.create(ImagePickerModalPage, {
      exampleImageUrl: this.exampleImageUrl,
      infoText: this.infoText,
      modalText: this.modalText,
      optionsCamera: this.optionsCamera,
      optionsImagePicker: this.optionsImagePicker,
      showSecurityQuestion: this.showSecurityQuestion
    });
    modal.onDidDismiss(data => {
      if (data) this.imagePick.emit(data);
    });
    modal.present();
  }
}
