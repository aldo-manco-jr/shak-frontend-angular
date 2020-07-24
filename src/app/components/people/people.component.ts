import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import _ from 'lodash';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  loggedUser: any;
  users = [];

  constructor(private userService: UserService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loggedUser = this.tokenService.getPayload();
    this.getAllUsers();
  }

  getAllUsers(){

    this.userService.GetAllUsers().subscribe((data) => {
      _.remove(data.allUsers, {username: this.loggedUser.username});
      this.users = data.allUsers;
    });
  }

}
