import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.css']
})
export class TopStreamsComponent implements OnInit {

  socketHost: any;
  socket: any;
  currentUser: any;

  topPosts = [];

  constructor(private postServices: PostService, private tokenService: TokenService, private router: Router) {

    this.currentUser = this.tokenService.getPayload();

    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost);
  }

  ngOnInit(): void {

    this.allPosts();

    this.socket.on('refreshPage', (data) => {
      this.allPosts();
    });
  }

  allPosts() {

    this.postServices.getAllPosts().subscribe((data) => {
      this.topPosts = data.top;
    }, err => {
      if (err.error.token === null) {
        this.socket.disconnect();
        this.tokenService.deleteToken();
        this.router.navigate(['']);
      }
    });
  }

  removePost(post){

    this.postServices.removePost(post).subscribe(() => {
      this.socket.emit('refresh', {});
    }, (error) => {
      console.log(error);
    });
  }


  timeFromNow(time) {
    return moment(time).fromNow();
  }

  likeOrUnlike(post, currentUser){

    if (!this.checkIfCurrentUserLikedPost(post.likes, currentUser.username)){
      this.likePost(post);
    }else{
      this.unlikePost(post);
    }
  }

  likePost(post) {

    this.postServices.addLike(post).subscribe(
      (data) => {
        console.log(data);
        this.socket.emit('refresh', {});
      },
      (error) => {
        console.log(error);
      });
  }

  unlikePost(post) {

    this.postServices.removeLike(post).subscribe(
      (data) => {
        this.socket.emit('refresh', {});
      },
      (error) => {
        console.log(error);
      });
  }

  checkIfCurrentUserLikedPost(likes_array, current_user_username) {
    // controlla se c'è un elemento di likes_array che ha come username -> current_user_username
    return _.some(likes_array, {username: current_user_username});
  }

  openCommentsBox(post) {
    return this.router.navigate(['post', post._id]);
  }

}
