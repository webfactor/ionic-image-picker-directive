# IonicImagePickerDirective

Adds imagepicker functionality to any button.  
Use `[wf-image-picker]` attribute on any `<button>` element.

## Installation

- Install `npm i @webfactor/ionic-image-picker-directive`.
- Install `ionic cordova plugin add cordova-plugin-camera`.
- Install `ionic cordova plugin add cordova-plugin-telerik-imagepicker`.
- Add `ImagePickerDirectiveModule` to your Ionic module imports.
- Add `TranslateModule.forRoot()` to your Ionic module imports.
- Add `ImageServiceProvider`to your Ionic providers
- Add `Camera`to your Ionic providers
- Add `ImagePicker` to your Ionic providers
- Add `AlertService` to your Ionic providers
- Add `TranslateService` to your Ionic providers
- Install npm install --save @ionic-native/camera
- Install npm Install --save @webfactor/ionic-alert-service
- install npm install --save @ionic-native/image-picker
- install npm i @ngx-translate/core
-

* If button don´t react to clickevents add `ImagePickerDirectiveModule` to your Ionic Page module imports.

## I/O

```typescript
title?: string
```

Default: `Bilder auswählen`. Title of ImagePickerModal.

```typescript
exampleImageUrl?: string
```

Default: ''. Show link to imageUrl than is shown about the Buttons

```typescript
infoText?: string
```

Default: ''. Describe Image or show Informationtext

```typescript
optionsCamera?: CameraOptions = {

quality?: number;

Picture quality in range 0-100. Default is 50

destinationType?: number;

DATA_URL : 0, Return image as base64-encoded string,
FILE_URI : 1, Return image file URI,
NATIVE_URI : 2 Return image native URI

sourceType?: number;

PHOTOLIBRARY : 0,
CAMERA : 1,
SAVEDPHOTOALBUM : 2

allowEdit?: boolean;
Allow simple editing of image before selection.

encodingType?: number;
Defined in Camera.EncodingType. Default is JPEG
JPEG : 0 Return JPEG encoded image
PNG : 1 Return PNG encoded image

targetWidth?: number;
Width in pixels to scale image. Must be used with targetHeight.
Aspect ratio remains constant.

targetHeight?: number;
Height in pixels to scale image. Must be used with targetWidth.


mediaType?: number;
Set the type of media to select from. Only works when PictureSourceType
is PHOTOLIBRARY or SAVEDPHOTOALBUM. Defined in Camera.MediaType
PICTURE: 0 allow selection of still pictures only. DEFAULT.
Will return format specified via DestinationType
VIDEO: 1 allow selection of video only, WILL ALWAYS RETURN FILE_URI
ALLMEDIA : 2 allow selection from all media types

correctOrientation?: boolean;
Rotate the image to correct for the orientation of the device during capture.

saveToPhotoAlbum?: boolean;
Save the image to the photo album on the device after capture.

cameraDirection?: number;
Defined in Camera.Direction. Default is BACK.
BACK: 0
FRONT: 1

popoverOptions?: CameraPopoverOptions;
iOS-only options that specify popover location in iPad. Defined in CameraPopoverOptions.
}
```

```typescript
optionsImagePicker?: ImagePickerOption = {

maximumImagesCount?: number; max images to be selected, defaults to 15. If this is set to 1, upon selection of a single image, the plugin will return it. (Android only)
width?: number; Max width to allow images to be
height?: number; Max height to allow images to be
quality?: number; Quality of images, defaults to 100
outputType?: number; Output type, defaults to 0  (FILE_URI). 1 is (BASE64_String)

}
```

```typescript
showSecurityQuestion : boolean;
Show SecurityQuestion when accept-Button is pressed
```

```typescript
imagePick;
```

Emits when the user click on accept button. _$event_ holds the imageUrl data.
The Object contails the imageUrls and if exist the type.

## Example

```html
<button ion-button
wf-image-picker
(imagePick)="pick($event)">
Image hinzufügen
</button>
```
