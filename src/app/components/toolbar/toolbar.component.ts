import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";
import * as M from 'materialize-css';
import * as moment from 'moment';
import io from 'socket.io-client';
import {UserService} from "../../services/user.service";
import _ from'lodash';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  socketHost: any;
  socket: any;

  user:any;
  notifications = [];
  count = [];

  constructor(private tokenService: TokenService, private router: Router, private userServices: UserService) {
    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost);
  }

  ngOnInit() {

    this.user = this.tokenService.getPayload();

    const dropDownElement = document.querySelector('.dropdown-trigger');

    M.Dropdown.init(dropDownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    })
  }

  GetUser(){
    this.userServices.GetUserById(this.user._id).subscribe((data) => {
      this.notifications = data.userFoundById.notifications.reverse();
      const value = _.filter(this.notifications, ['read', false]);
      this.count = value;
    }, err =>{
      //se il token scade ci riporta alla login
      if (err.error.token === null){
        this.tokenService.deleteToken();
        this.router.navigate(['']);
      }
    });
  }

  MarkAll(){
    this.userServices.MarkAllAsRead().subscribe((data) => {
      this.socket.emit('refresh',{});
    })
  }

  logout(){
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }

  GoToHome(){
    this.router.navigate(['streams']);
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }
}
