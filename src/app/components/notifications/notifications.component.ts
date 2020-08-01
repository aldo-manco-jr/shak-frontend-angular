import { Component, OnInit } from '@angular/core';
import { Token } from '@angular/compiler';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  socket: any;
  socketHost: string;

  user: any;
  notifications = [];

  constructor(private tokenService: TokenService, private userService: UserService) {

    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost);

  }

  ngOnInit(): void {

    this.user = this.tokenService.getPayload();
    this.GetUser();

    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.userService.GetUserById(this.user._id).subscribe((data) => {
      this.notifications = data.userFoundById.notifications.reverse();
    });

    // this.userService.GetUserByName(this.user.username).subscribe((data) =>{
    //   this.notifications= data.result.notification;
    // });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  MarkNotification(data) {

    this.userService.MarkNotification(data._id).subscribe((value) => {
      this.socket.emit('refresh', {});
    });
  }

  DeleteNotification(data) {

    this.userService.MarkNotification(data._id, true).subscribe((value) => {
      this.socket.emit('refresh', {});
    });
  }
}
