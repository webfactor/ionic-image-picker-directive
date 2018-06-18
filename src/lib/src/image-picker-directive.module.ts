import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ImagePickerDirective } from './directives/image-picker';
import { ImagePickerModalPage } from './pages/image-picker-modal/image-picker-modal';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ImagePickerDirective, ImagePickerModalPage],
  exports: [ImagePickerDirective],
  entryComponents: [ImagePickerModalPage]
})
export class ImagePickerDirectiveModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImagePickerDirectiveModule,
      providers: []
    };
  }
}
