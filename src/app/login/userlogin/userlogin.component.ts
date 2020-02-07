import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  public passwordIcon = false;
  public isValidFormSubmitted = null;
  public isValidRegFormSubmitted = null;
  public showWelcome = false;
  public userEmail;
  public emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public url = 'https://userlist-e580b.firebaseio.com/users.json';

  public loginForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
    pass: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  /**
   * @description: this method created for user Log in
   * @author: Virendra Pandey
   * @since: 12/09/2018
   */
  logIn() {
    this.isValidFormSubmitted = false;
    if (this.loginForm.invalid) {
      return;
    }
    this.http.get(this.url).subscribe((userData) => {
      const registrationData = userData;
      Object.entries(registrationData).forEach(([key, users]) => {
        if (this.loginForm.value['userEmail'] === users['myEmail'] && this.loginForm.value['pass'] === users['password']) {
          const welcomeMessage = `Welcome ${users['userName']}!!`;
          this.router.navigate(['module']);
          this.openSnackBar(welcomeMessage);
        }
      });
    });
  }

  /**
  * @description: Method showing notification after log in
  * @author: Virendra Pandey
  * @since: 12/09/2018
  */
  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
    });
  }
}
