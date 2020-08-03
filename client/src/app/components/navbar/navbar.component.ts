import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {AuthServiceService} from '../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private authServiceService: AuthServiceService
  ) {
    this.authServiceService.currentUser.subscribe(logged => this.currentUser = logged);
  }

  ngOnInit() {
  }

  logout() {
    this.authServiceService.logout();
    this.router.navigate(['/login']);
  }
}
