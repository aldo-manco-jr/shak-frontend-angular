import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  receiverName: string;

  senderUser: any;
  receiverUser: any;

  message: string;

  constructor(private tokenService: TokenService, private messageService: MessageService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {

    this.senderUser = this.tokenService.getPayload();

    this.route.params.subscribe((params) => {
      this.receiverName = params.name;
      this.GetUserByUsername(this.receiverName);
      console.log(this.receiverUser);
    });
  }

  GetUserByUsername(name){

    this.userService.GetUserByName(name).subscribe((data) => {
      this.receiverUser = data.userFoundByName;
    });
  }

  sendMessage(){

    this.messageService.SendMessage(this.senderUser._id, this.receiverUser._id, this.receiverUser.username, this.message).subscribe((data) => {
      console.log(data);
    })
  }

}
