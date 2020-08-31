import { AfterViewInit, Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';
import io from "socket.io-client";
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit, AfterViewInit {

  toolbarUserData: any;

  socket: any;
  socketHost: any;

  commentForm: FormGroup;
  postId: any;
  commentsArray = [];
  post: string;

  loggedUser: any;

  constructor(private fb: FormBuilder, private postService: PostService, private  route: ActivatedRoute, private tokenService: TokenService) {
    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost);
  }

  ngOnInit(): void {

    this.loggedUser = this.tokenService.getPayload();

    this.toolbarUserData = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');

    this.init();

    this.GetPost();

    this.socket.on('refreshPage', data =>{
      this.GetPost();
    });
  }

  init(){
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  /* ngAfterViewInit() viene eseguito dopo che la view è stata inizializzata, renderizzata,
      in modo che il tag che abbiamo referenziato con querySelector()
      possa essere modificato */
  ngAfterViewInit(): void {
    this.toolbarUserData.style.display = 'none';
  }

  addComment(){
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      this.socket.emit('refresh', {});
      this.commentForm.reset();
    });
  }

  isCommentMine(comment){
    if (this.loggedUser.username === comment.username) {
      return true;
    }else {
      return false;
    }
  }

  removeComment(comment){

    this.postService.removeComment(this.postId, comment).subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  GetPost(){
    this.postService.getPost(this.postId).subscribe(data =>{
      this.post = data.post.post;
      this.commentsArray = data.post.comments.reverse();
    })
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

}
