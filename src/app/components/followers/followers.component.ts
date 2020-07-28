import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";
import {UserService} from "../../services/user.service";
import * as io from 'socket.io-client'

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers = [];
  user: any;

  socket: any;
  socketHost: string;

  constructor(private tokenService: TokenService,private userService: UserService) {

    this.socketHost ='http://localhost:3000';
    this.socket = io(this.socketHost);

  }

  ngOnInit(): void {

    this.user = this.tokenService.getPayload();
    this.GetUser();
    this.socket.on('refreshPage', (data) => {
      this.GetUser();
    });
  }

  GetUser(){
    this.userService.GetUserById(this.user._id).subscribe( (data) =>{
      this.followers = data.userFoundById.followers;
    }, err => console.log(err));
  }

}
