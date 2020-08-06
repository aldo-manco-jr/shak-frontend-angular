import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import io from 'socket.io-client';
import _ from 'lodash';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() onlineUsers;

  receiverName: string;

  senderUser: any;
  receiverUser: any;

  message: string;

  messagesArray = [];

  socketHost: string;
  socket: any;

  typingMessage;
  typing = false;

  isReceiverOnline = false;

  constructor(private tokenService: TokenService, private messageService: MessageService, private route: ActivatedRoute, private userService: UserService) {
    this.socketHost = 'http://localhost:3000/';
    this.socket = io(this.socketHost);
  }

  ngOnInit(): void {

    this.senderUser = this.tokenService.getPayload();

    this.route.params.subscribe((params) => {
      this.receiverName = params.name;
      this.GetUserByUsername(this.receiverName);
    });

    this.socket.on('refreshPage', (data) => {
      this.GetUserByUsername(this.receiverName);
    });

    this.socket.on('is_typing', (data) => {
      if (data.sender == this.receiverName) {
        this.typing = true;
      }
    });

    this.socket.on('has_stopped_typing', (data) => {
      if (data.sender == this.receiverName) {
        this.typing = false;
      }
    });
  }

  ngAfterViewInit(): void {

    const params = {
      room1: this.senderUser.username,
      room2: this.receiverName
    }

    this.socket.emit('join chat', params);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.onlineUsers.currentValue.length > 0){

      console.log(changes.onlineUsers.currentValue);

      const indexReceiverOfOnlineUsers = _.indexOf(changes.onlineUsers.currentValue, this.receiverName);

      if (indexReceiverOfOnlineUsers > -1){
        this.isReceiverOnline = true;
      } else{
        this.isReceiverOnline = false;
      }
    }
  }

  GetUserByUsername(name) {

    this.userService.GetUserByName(name).subscribe((data) => {
      this.receiverUser = data.userFoundByName;
      this.getAllMessages(this.senderUser._id, data.userFoundByName._id);
    });
  }

  sendMessage() {

    if (this.message) {

      this.messageService.SendMessage(this.senderUser._id, this.receiverUser._id, this.receiverUser.username, this.message).subscribe((data) => {
        this.message = '';
        this.socket.emit('refresh', {});
      });
    }
  }

  getAllMessages(senderId, receiverId) {
    this.messageService.GetAllMessages(senderId, receiverId).subscribe((data) => {
      this.messagesArray = data.messages.message;
    });
  }

  isSentByLoggedUser(message){
    return (this.senderUser._id === message.senderId);
  }

  isTyping(){

    this.socket.emit('start_typing', {
      sender: this.senderUser.username,
      receiver: this.receiverName
    });

    if (this.typingMessage){
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(() => {

      this.socket.emit('stop_typing', {
        sender: this.senderUser.username,
        receiver: this.receiverName
      });
    }, 5000);
  }

}
