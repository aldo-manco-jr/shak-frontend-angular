import {Component, OnInit} from '@angular/core';
import {Token} from "@angular/compiler";
import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import * as M from 'materialize-css';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})

export class StreamsComponent implements OnInit {
  token: any;
  streamsTabs = false;
  topStreamsTabs = false;

  constructor(private router: Router, private tokenService: TokenService) {
  }

  ngOnInit() {
    this.streamsTabs = true;
    this.token = this.tokenService.getPayload();
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }

  ChangeTabs(value) {
    if (value === 'streams') {
      this.streamsTabs = true;
      this.topStreamsTabs = false;
    }
    if (value === 'top') {
      this.streamsTabs = false;
      this.topStreamsTabs = true;
    }
  }
}
