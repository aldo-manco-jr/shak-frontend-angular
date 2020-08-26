import {UserService} from "../../services/user.service";
import {Component, OnInit} from "@angular/core";
import {TokenService} from "../../services/token.service";
import io from 'socket.io-client';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})

export class SideComponent implements OnInit{
  socket: any;
  socketHost: any;
  user: any;
  userData: any;

  constructor(private tokenService: TokenService, private userService: UserService){
    this.socketHost = 'http://localhost:3000';
    this.socket = io(this.socketHost);
  }
  ngOnInit() {
    this.user = this.tokenService.getPayload();
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    })
  }

  GetUser(){
    this.userService.GetUserById(this.user._id).subscribe(data =>{
    this.userData = data.userFoundById;
    })
  }
}
