import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent {
  isMenuOpen: boolean = false;
  isAuthenticated: boolean = false;
  userName: string = "";

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService, 
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated ?? false;
      this.getUserDetails();
    })
  }

  getUserDetails():void {
    if (this.isAuthenticated){
      this.oktaAuth.getUser().then(
        (response) => {
          this.userName = response.name as string;
          this.storage.setItem("userEmail", JSON.stringify(response.email));
          this.storage.setItem("firstName", JSON.stringify(response.given_name));
          this.storage.setItem("lastName", JSON.stringify(response.family_name));
          this.storage.setItem("phoneNumber", JSON.stringify(response['phoneNumber']));
        }
      )
    }
  }

  logout():void {
    this.storage.clear();
    this.oktaAuth.signOut();
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

