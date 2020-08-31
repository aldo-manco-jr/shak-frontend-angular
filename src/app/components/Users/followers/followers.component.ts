import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../../services/token.service";
import {UserService} from "../../../services/user.service";
import * as io from 'socket.io-client'
import { Router } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers = [];
  loggedUser: any;

  socket: any;
  socketHost: string;

  constructor(private tokenService: TokenService,private userService: UserService, private router: Router) {

    this.socketHost ='http://localhost:3000';
    this.socket = io(this.socketHost);

  }

  ngOnInit(): void {

    this.loggedUser = this.tokenService.getPayload();
    this.GetUser();
    this.socket.on('refreshPage', (data) => {
      this.GetUser();
    });
  }

  GetUser(){
    this.userService.GetUserById(this.loggedUser._id).subscribe( (data) =>{
      this.followers = data.userFoundById.followers;
    }, err => console.log(err));
  }

  viewUser(user) {

    this.router.navigate([user.follower.username]);

    if(this.loggedUser.username !== user.username){
      this.userService.ProfileNotifications(user._id).subscribe(data =>{
          this.socket.emit('refresh', {});
        }, err => console.log(err)
      );
    }
  }

}
