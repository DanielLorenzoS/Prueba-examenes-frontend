import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

export interface User {
  id:       number;
  username: string;
  password: string;
  name:     string;
  lastname: string;
  email:    string;
  phone:    string;
  enabled:  boolean;
  profile:  null | string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  constructor(private user: UserService) {}

  data!: any; 

  displayedColumns: string[] = ['id', 'username', 'name', 'lastname', 'email', 'phone'];

  ngOnInit() {
    this.user.getUsers().subscribe((r) => {
      this.data = r;
    });
  }

}
