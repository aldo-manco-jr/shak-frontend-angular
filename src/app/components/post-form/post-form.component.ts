import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FileUploader } from 'ng2-file-upload';
import io from 'socket.io-client';

const BASE_URL = 'http://localhost:3000/api/shak/upload-image';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})

export class PostFormComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: BASE_URL,
    disableMultipart: true
  });

  selectedFile: any;

  socketHost: any;
  socket: any;

  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost);
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.postForm = this.fb.group({
      post: ['', Validators.required]
    });
  }

  submitPost() {

    let body;

    if (!this.selectedFile) {
      body = {
        post: this.postForm.value.post
      };
    } else {
      body = {
        post: this.postForm.value.post,
        image: this.selectedFile
      };
    }

    this.postService.addPost(body).subscribe(data => {
      this.socket.emit('refresh', {});
      this.postForm.reset();
    });
  }

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

  onFileSelected(event) {
    const file: File = event[0];
    this.readAsBase64(file)
      .then(result => {
        this.selectedFile = result;
      })
      .catch(err => console.log(err));
  }
}
