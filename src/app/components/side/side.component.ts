import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import * as io from 'socket.io-client'

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  numPosts: any;
  socket: any;
  socketHost: string;

  posts = [];

  constructor(private postService: PostService) {
    this.socketHost ='http://localhost:3000';
    this.socket = io(this.socketHost);
  }

  ngOnInit(): void {

    this.allPosts();

    this.socket.on('refreshPage', (data) => {
      this.allPosts();
    });
  }

  allPosts() {

    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data.allPosts;
      this.numPosts = this.posts.length;
      console.log(data);
    });


  }


}
