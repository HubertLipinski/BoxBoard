import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loading: boolean;
  users: Array<User>;
  totalRecords = '';
  page = 1;
  toEdit = null;
  deletingUser = null;

  constructor(private userService: UserService) {
    this.loading = true;
    this.userService.getAll().subscribe(users => {
        this.users = users;
        this.totalRecords = users.length;
        this.loading = false;
      }
    );
  }

  ngOnInit() {
  }

  edit(id: number) {
    this.toEdit = id;
  }

  delete(id: number) {
    this.deletingUser = id;
    this.userService.delete(id).subscribe(
      response => {
        this.deletingUser = null;
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  close() {
    this.toEdit = null;
  }
}
