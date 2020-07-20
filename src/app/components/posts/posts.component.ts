import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import * as moment from 'moment';
import io from 'socket.io-client'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  socketHost: any;
  socket: any;

  posts = [];

  constructor(private postServices: PostService) {
    this.socketHost = 'http://localhost:3000'
    this.socket = io(this.socketHost);
  }

  ngOnInit(): void {

    this.allPosts();

    this.socket.on('refreshPage', (data) => {
      this.allPosts();
    });
  }

  allPosts(){

    this.postServices.getAllPosts().subscribe((data) => {
      this.posts = data.allPosts;
      console.log(data);
    });
  }

  timeFromNow(time){
    return moment(time).fromNow();
  }

}
