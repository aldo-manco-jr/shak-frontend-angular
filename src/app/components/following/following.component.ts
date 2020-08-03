import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";
import {UserService} from "../../services/user.service";
import * as io from 'socket.io-client'

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  following = [];
  user: any;

  socket: any;
  socketHost: string;

  constructor(private tokenService: TokenService, private userService: UserService) {

    this.socketHost ='http://localhost:3000';
    this.socket = io(this.socketHost);

  }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload();
    this.GetUser();

    //automaticamente al nuovo following lo aggiunge in following facendo un refreshpage
    this.socket.on('refreshPage', (data) => {
      this.GetUser();
    });
  }

  GetUser(){
    this.userService.GetUserById(this.user._id).subscribe( (data) =>{
      this.following = data.userFoundById.following;
    }, err => console.log(err));
  }

  UnFollowUser(user){
    this.userService.UnFollowUser(user._id).subscribe(data =>{
      this.socket.emit('refresh',{});
    })
  }

}