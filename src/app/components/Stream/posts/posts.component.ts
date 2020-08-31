import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  socketHost: any;
  socket: any;
  currentUser: any;

  posts = [];
  following = [];
  followersPosts = [];
  emptyArray = [];

  constructor(private postServices: PostService, private tokenService: TokenService, private router: Router, private userService: UserService) {

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

    this.userService.GetUserById(this.currentUser._id).subscribe((data) => {

      this.following = data.userFoundById.following;
      this.following.push({
        userFollowed: this.currentUser
      })

      this.postServices.getAllPosts().subscribe((data) => {

        this.followersPosts.length = 0;
        this.posts = data.allPosts;

        for (let i = 0; i < this.posts.length; i++) {
          for (let j = 0; j < this.following.length; j++) {
            if (this.posts[i].user_id._id === this.following[j].userFollowed._id) {
              this.followersPosts.push(this.posts[i]);
            }
          }
        }
      }, err => console.log(err));

    }, err => {
      if (err.error.token === null) {
        this.socket.disconnect();
        this.tokenService.deleteToken();
        this.router.navigate(['']);
      }
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  likeOrUnlike(post, currentUser) {

    if (!this.checkIfCurrentUserLikedPost(post.likes, currentUser.username)) {
      this.likePost(post);
    } else {
      this.unlikePost(post);
    }
  }

  likePost(post) {

    this.postServices.addLike(post).subscribe(
      (data) => {
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
    return _.some(likes_array, { username: current_user_username });
  }

  openCommentsBox(post) {
    return this.router.navigate(['post', post._id]);
  }

  removePost(post){

    this.postServices.removePost(post).subscribe(() => {
      this.socket.emit('refresh', {});
    }, (error) => {
      console.log(error);
    });
  }

}
