import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import * as M from 'materialize-css';
import * as moment from 'moment';
import io from 'socket.io-client';
import {UserService} from "../../../services/user.service";
import _ from 'lodash';
import {MessageService} from "../../../services/message.service";

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

  imageId: any;
  imageVersion: any;

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

    this.getToolbarData();
    this.socket.on('refreshPage', () => {
      this.getToolbarData();
    })
  }

  ngAfterViewInit(): void {

    this.socket.on('listOnlineUsers', (data) => {
      this.onlineUsers.emit(data);
    });
  }

  getToolbarData() {
    this.userServices.GetUserById(this.user._id).subscribe((data) => {

      this.imageId = data.userFoundById.profileImageId;
      this.imageVersion =  data.userFoundById.profileImageVersion;

      this.notifications = data.userFoundById.notifications.reverse();
      const value = _.filter(this.notifications, ['read', false]);
      this.count = value;
      this.chatList = data.userFoundById.chatList;
      this.checkIfMessageIsRead(this.chatList);
    }, err => {
      //se il token scade ci riporta alla login
      if (err.error.token === null) {
        this.socket.disconnect();
        this.tokenService.deleteToken();
        this.router.navigate(['']);
      }
    });
  }

  checkIfMessageIsRead(arr) {

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

  markAllUserNotificationAsRead() {
    this.userServices.MarkAllAsRead().subscribe((data) => {
      this.socket.emit('refresh', {});
    })
  }

  markAllMessagesAsRead() {

    this.messageService.MarkAllMessages().subscribe((data) => {
      this.msgNumber = 0;
      this.socket.emit('refresh', {});
    });
  }

  logOut() {

    this.socket.disconnect();
    this.tokenService.deleteToken();
    this.router.navigate(['/']);
  }

  goToHome() {
    this.router.navigate(['streams']);
  }

  goToChatPage(name){
    this.router.navigate(['chat',name]);
    this.messageService.MarkReceiverMessages(this.user.username, name).subscribe(data =>{
      this.socket.emit('refresh', {});
    });
  }

  timeFromNow(time) {
    return moment(time).fromNow();
  }

  getMessageDate(time) {
    return moment(time).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: '[DD/Mm/YYYY]',
      sameElse: '[DD/Mm/YYYY]',
    });
  }
}
