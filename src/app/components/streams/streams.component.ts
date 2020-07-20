import { Component, OnInit } from '@angular/core';
import {Token} from "@angular/compiler";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})

export class StreamsComponent implements OnInit{
  token: any;

  constructor(private router: Router, private tokenService: TokenService) {
  }

  ngOnInit() {
    this.token = this.tokenService.GetPayload();
    console.log(this.token);
  }

}
