import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { Instagram } from '@ionic-native/instagram/ngx';
import { MapsService } from '../maps.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';






@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  lat: string = '';
  lng: string = '';
  location : Object;

  public photos: Photo[] = [];
  currentImage = null;

  constructor(private camera: Camera, private storage: Storage, private instagram: Instagram, private map: MapsService, 
    private geolocation: Geolocation) { }
  takePicture() {
  const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
  };
  
  this.camera.getPicture(options).then((imageData) => {
    // Add new photo to gallery
    this.photos.unshift({
      
      data: 'data:image/jpeg;base64,' + imageData

    
    });

    this.currentImage = 'data:image/jpeg;base64,' + imageData;

    // Save all photos for later viewing
    this.storage.set('photos', this.photos);
  }, (err) => {
    // Handle error
    console.log("Camera issue: " + err)
})}

loadImage() {
  let options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY      
  }

  this.camera.getPicture(options).then(data => {
    this.currentImage = 'data:image/jpeg;base64,' + data;
   }, err => {
    // Handle error
    console.log(err)
   });
}

shareImage() {
/*
  let postData = {
    "title": "test",
    "image": this.currentImage
  }
 
    this.http.post("http://192.168.1.65:3000/create", postData); {
    return this.http.post("http://192.168.1.65:3000/create", JSON.stringify(postData))
    .map((response: Response) => {
            return response.json();
        });
      }; 
*/
  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
   }).catch((error) => {
     console.log('Error getting location', error);
   });
   
   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    data.coords.latitude
    data.coords.longitude

  this.instagram.share(this.currentImage, 'I am at ' + 'lat: ' + data.coords.latitude + ' ' + 'lgn:' + data.coords.longitude)
    .then(() => {
      // Image might have been shared but you can't be 100% sure
      })
    .catch(err => {
      // Handle error
      console.error(err);      
      });
   });
/*  
   let post = this.http.post('http://192.168.1.65:3000/create', {
      title: 'TEST',
      body: this.currentImage,
      userId: 2
    })
      post.subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );*/  
}
  
loadSaved() {
  this.storage.get('photos').then((photos) => {
    this.photos = photos || [];
  });
}

}

class Photo {
  data: any;
}
