import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  @Output() userChange = new EventEmitter<User>();
  @Output() done = new EventEmitter<boolean>();

  editForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: [this.user.name],
      email: [this.user.email],
    });
  }

  get form() { return this.editForm.controls; }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.update(this.editForm.value, this.user.id).subscribe(
      data => {
        this.user = data;
        this.close();
        this.userChange.emit(data);
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  close() {
    this.loading = false;
    this.done.emit(true);
  }

}
