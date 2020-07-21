import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {

  toolbarUserData: any;

  constructor() {
  }

  ngOnInit(): void {
    this.toolbarUserData = document.querySelector('.nav-content');
  }

  /* ngAfterViewInit() viene eseguito dopo che la view è stata inizializzata, renderizzata,
      in modo che il tag che abbiamo referenziato con querySelector()
      possa essere modificato */

  ngAfterViewInit(): void {
    this.toolbarUserData.style.display = 'none';
  }

}
