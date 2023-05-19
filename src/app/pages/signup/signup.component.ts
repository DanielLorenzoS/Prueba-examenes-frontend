import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private readonly fb: FormBuilder, private userService: UserService) { }

  userForm!: FormGroup;
  username!: string;


  ngOnInit(): void {
    this.userForm = this.initForm();
  }

  phoneValidator(event: any) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }

  reset(): void {
    this.userForm.reset();
  }
  
  onSubmit(): void {
    this.userService.addUser(this.userForm.value).subscribe(e => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User saved successfully',
        showConfirmButton: false,
        timer: 2000
      })
      this.userForm.reset();
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something wrong',
        showConfirmButton: false,
        timer: 2000
      })
    }
    )

  }
  initForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

}
