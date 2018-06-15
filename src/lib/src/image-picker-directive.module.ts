import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: []
})
export class ImagePickerDirectiveModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImagePickerDirectiveModule,
      providers: []
    };
  }
}
