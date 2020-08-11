import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {UserService} from "../../services/user.service";
import {TokenService} from "../../services/token.service";
import io from 'socket.io-client';

const BASE_URL = 'http://localhost:3000/api/shak/upload-image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})

export class ImagesComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: BASE_URL,
    disableMultipart: true
  })

  selectedFile: any;

  loggedUser: any;
  arrayImages = [];

  socket: any;
  socketHost: string;

  constructor(private userService: UserService, private tokenService: TokenService) {

    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost);

  }

  ngOnInit(): void {

    this.loggedUser = this.tokenService.getPayload();
    this.getUser();

    this.socket.on('refreshPage', () => {
      this.getUser();
    });
  }

  getUser() {

    this.userService.GetUserById(this.loggedUser._id).subscribe(
      (data) => {
        console.log(data);
        this.arrayImages = data.userFoundById.images;
      }, (error) => {
        console.log(error);
      }
    );
  }

  onFileSelected(event) {
    const file: File = event[0];
    this.readAsBase64(file)
      .then(result => {
        this.selectedFile = result;
      })
      .catch(err => console.log(err));
  }

  Upload() {
    if (this.selectedFile) {
      this.userService.AddImage(this.selectedFile).subscribe((data) => {
         const filePath = <HTMLInputElement>document.getElementById('filePath');
          filePath.value = '';
        this.socket.emit('refresh', {});
        },
        (err) => console.log(err)
      );
    }
  }

SetProfileImage(image){
    this.userService.SetDefaultImage(image.imageId, image.imageVersion).subscribe(data =>{
      console.log(image);
      this.socket.emit('refresh', {});
    },
      err => console.log(err)
    );
};

// file reader API
  readAsBase64(file): Promise<any> {

    const reader = new FileReader();

    const fileValue = new Promise((resolve, reject) => {

      reader.addEventListener('load', () => {
        resolve(reader.result);
      });

      reader.addEventListener('error', () => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });

    return fileValue;
  }

}
