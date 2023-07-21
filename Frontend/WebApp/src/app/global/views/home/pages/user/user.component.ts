import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticateService } from '../../../../../shared/auth/authenticate.service';
import { IUser } from '../../../../../shared/models/interface/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private page: Title,
              private userAuth: AuthenticateService)
  { }

  users: IUser[] = [];

  ngOnInit(): void {
    this.page.setTitle("Registro de usuarios");
    this.userAuth.getUser().subscribe({
      next: (data) => {
        this.users = Object.values(data);
      }
    });
  }

}
