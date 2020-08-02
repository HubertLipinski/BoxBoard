import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authServiceService: AuthServiceService) {}

  ngOnInit() {
  }

  onSubmit() {
    this.authServiceService.register();
  }

}
