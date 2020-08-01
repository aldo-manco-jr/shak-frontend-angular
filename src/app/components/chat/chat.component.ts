import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {

  toolbarUserData: any;

  constructor() {
  }

  ngOnInit(): void {
    this.toolbarUserData = document.querySelector('.nav-content');
  }

  ngAfterViewInit(): void {
    this.toolbarUserData.style.display = 'none';
  }

}
