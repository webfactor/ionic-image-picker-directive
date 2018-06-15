import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { ImagePickerModalPage } from '../pages/image-picker-modal/image-picker-modal';

@Directive({ selector: 'button[wf-position-picker]' })
export class PositionPickerDirective {
  @Output() positionPick = new EventEmitter();

  @Input() title?: string = 'Position auswählen';
  @Input() zoom?: number = 13;
  @Input() streetViewControl?: boolean = false;
  @Input() zoomControl?: boolean = false;
  @Input() backIcon?: string = 'arrow-back';
  @Input() acceptIcon?: string = 'checkmark';
  @Input() saveOnClose?: boolean = false;

  constructor(private modalCtrl: ModalController) {}

  @HostListener('click')
  presentPositionPickerModal() {
    let modal = this.modalCtrl.create(ImagePickerModalPage, {
      backIcon: this.backIcon,
      acceptIcon: this.acceptIcon,
      title: this.title,
      zoom: this.zoom,
      steetViewControl: this.streetViewControl,
      zoomControl: this.zoomControl,
      saveOnClose: this.saveOnClose
    });
    modal.onDidDismiss(data => {
      if (data) this.positionPick.emit(data);
    });
    modal.present();
  }
}
