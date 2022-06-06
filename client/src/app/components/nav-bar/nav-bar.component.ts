import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userLogged: boolean = false;

  constructor(private userService: UserService) {
    this.userService.userStatus.subscribe((userLogged) => {
      this.userLogged = userLogged;
    });
  }

  ngOnInit(): void { }

  logOut() {
    this.userService.logOut();
  }
}
