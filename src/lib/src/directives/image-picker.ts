import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CameraOptions } from '@ionic-native/camera';
import { ImagePickerOptions } from '@ionic-native/image-picker';
import { ModalController } from 'ionic-angular';

import { ImagePickerModalPage } from '../pages/image-picker-modal/image-picker-modal';

@Directive({ selector: 'button[wf-image-picker]' })
export class ImagePickerDirective {
  @Output() imageUrls = new EventEmitter();

  @Input() title?: string = 'Position auswählen';
  @Input() exampleImageUrl?: string = '';
  @Input() infoText?: string = '';
  @Input() optionsCamera?: CameraOptions = null;
  @Input() optionsImagePicker?: ImagePickerOptions = null;
  @Input() showSecurityQuestion?: boolean = true;

  constructor(private modalCtrl: ModalController) {}

  @HostListener('click')
  presentPositionPickerModal() {
    let modal = this.modalCtrl.create(ImagePickerModalPage, {
      title: this.title,
      exampleImageUrl: this.exampleImageUrl,
      infoText: this.infoText,
      optionsCamera: this.optionsCamera,
      optionsImagePicker: this.optionsImagePicker,
      showSecurityQuestion: this.showSecurityQuestion
    });
    modal.onDidDismiss(data => {
      if (data) this.imageUrls.emit(data);
    });
    modal.present();
  }
}
