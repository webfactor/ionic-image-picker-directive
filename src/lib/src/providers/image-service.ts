import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';

import { ImagePicker } from '@ionic-native/image-picker';

@Injectable()
export class ImageServiceProvider {
    takeImageUrl: String = '';
    pickImageUrls: String[] = [];
    constructor(private camera: Camera, private imagePicker: ImagePicker) { 
    }


    takeImage(): Promise<String> { 
         let optionsCamera = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

try {
     return new Promise((resolve, reject) => {
            this.camera.getPicture(optionsCamera).then(
                imageData => {
                    this.takeImageUrl = imageData;
                    resolve(this.takeImageUrl);
                },
                err => {
                    reject(console.log(err));
                }
            );
        });
} catch (error) {
    
}
      
       
    }

    pickImage(): Promise<String[]> {
        this.pickImageUrls = [];
        let optionsImagePicker = {
            outputType: 0,
            
            quality: 100,            
        };
         
        return new Promise((resolve, reject) => {
            this.imagePicker.getPictures(optionsImagePicker).then(
                results => {
                    for (let i = 0; i < results.length; i++) {
                        this.pickImageUrls[this.pickImageUrls.length] =  results[i];
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
