import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  username!: string;
  password!: string;
  data: string[] = [];

  constructor(private readonly fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  reset(): void {
    this.loginForm.reset();
  }

  onSubmit(): void {
    this.data.push(this.loginForm.value.username);
    this.data.push(this.loginForm.value.password);
    console.log(this.data);
    this.userService.login(this.data).subscribe((res) => {
      console.log(res);
    })
  }

}
