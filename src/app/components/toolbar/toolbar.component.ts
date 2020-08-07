import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";
import * as M from 'materialize-css';
import * as moment from 'moment';
import io from 'socket.io-client';
import {UserService} from "../../services/user.service";
import _ from 'lodash';
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterViewInit {

  @Output() onlineUsers = new EventEmitter();

  socketHost: any;
  socket: any;

  user: any;
  notifications = [];
  count = [];
  chatList = [];
  msgNumber = 0;

  constructor(private tokenService: TokenService, private router: Router, private userServices: UserService, private messageService: MessageService) {
    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost);
  }

  ngOnInit() {

    this.user = this.tokenService.getPayload();

    const dropDownElement = document.querySelectorAll('.dropdown-trigger');

    M.Dropdown.init(dropDownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false,

    });
    const dropDownElementTwo = document.querySelectorAll('.dropdown-trigger1');

    M.Dropdown.init(dropDownElementTwo, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });

    this.socket.emit('online', {room: 'global', userUsername: this.user.username});

    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    })
  }

  ngAfterViewInit(): void {

    this.socket.on('listOnlineUsers', (data) => {
      this.onlineUsers.emit(data);
    });
  }

  GetUser() {
    this.userServices.GetUserById(this.user._id).subscribe((data) => {
      this.notifications = data.userFoundById.notifications.reverse();
      const value = _.filter(this.notifications, ['read', false]);
      this.count = value;
      this.chatList = data.userFoundById.chatList;
      this.checkIfRead(this.chatList);
    }, err => {
      //se il token scade ci riporta alla login
      if (err.error.token === null) {
        this.socket.disconnect();
        this.tokenService.deleteToken();
        this.router.navigate(['']);
      }
    });
  }

  checkIfRead(arr) {

    const checkArr = [];

    for (let i = 0; i < arr.length; i++) {

      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];

     if(this.router.url !==`/chat/${receiver.sendername}`){
       if(receiver.isRead === false && receiver.receiverName === this.user.username){
         checkArr.push(1);
         this.msgNumber = _.sum(checkArr);
       }
     }
    }
  }

  MarkAll() {
    this.userServices.MarkAllAsRead().subscribe((data) => {
      this.socket.emit('refresh', {});
    })
  }

  MarkAllMessages() {

    this.messageService.MarkAllMessages().subscribe((data) => {
      this.msgNumber = 0;
      this.socket.emit('refresh', {});
    });
  }

  logout() {

    this.socket.disconnect();
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }

  GoToHome() {
    this.router.navigate(['streams']);
  }

  GoToChatPage(name){
    this.router.navigate(['chat',name]);
    this.messageService.MarkReceiverMessages(this.user.username, name).subscribe(data =>{
      this.socket.emit('refresh', {});
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  MessageDate(time) {
    return moment(time).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[DD/Mm/YYYY]',
      sameElse: '[DD/Mm/YYYY]',
    });
  }
}
