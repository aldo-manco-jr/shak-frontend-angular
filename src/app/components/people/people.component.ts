import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import _ from 'lodash';
import {TokenService} from '../../services/token.service';
import * as io from 'socket.io-client'
import {Router} from "@angular/router";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  loggedUser: any;
  users = [];
  followedUsers = [];

  socketHost: string;
  socket: any;

  listOnlineUsers = [];

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) {

    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost);

  }

  ngOnInit(): void {
    this.loggedUser = this.tokenService.getPayload();
    this.getAllUsers();
    this.getUserById();

    this.socket.on('refreshPage', (data) => {
      this.getAllUsers();
      this.getUserById();
    });
  }

  getAllUsers() {

    this.userService.GetAllUsers().subscribe((data) => {
      _.remove(data.allUsers, {username: this.loggedUser.username});
      this.users = data.allUsers;
    });
  }

  getUserById() {
    this.userService.GetUserById(this.loggedUser._id).subscribe((data) => {
      this.followedUsers = data.userFoundById.following;
    });
  }

  getUserByUsername() {
    this.userService.GetUserByName(this.loggedUser.username).subscribe((data) => {
      this.followedUsers = data.userFoundByName.following;
    });
  }

  checkIfUserIsFollowed(arr, id) {
    return _.find(arr, ['userFollowed._id', id]);
  }

  followUser(user) {
    this.userService.FollowUser(user._id).subscribe((data) => {
      this.socket.emit('refresh', {});
    })
  }

  online(event) {
    this.listOnlineUsers = event;
  }

  checkIfOnline(username) {

    const result = _.indexOf(this.listOnlineUsers, username);

    if (result > -1) {
      return true;
    } else {
      return false;
    }
  }

  viewUser(user) {
    this.router.navigate([user.username]);
    console.log(user.username);
    if(this.loggedUser.username !== user.username){
      this.userService.ProfileNotifications(user._id).subscribe(data =>{
        this.socket.emit('refresh', {});
      }, err => console.log(err)
      );
    }
  }

}
