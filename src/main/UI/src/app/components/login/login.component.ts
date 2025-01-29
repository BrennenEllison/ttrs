import { Component, OnInit, Inject } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget';
import oiconfig from "../../config/oiconfig";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo: '../../assets/cedarcreek-logo-white.png',
      features: {
        registration: true
      },
      baseUrl: oiconfig.oidc.issuer.split('/oauth2')[0],
      clientId: oiconfig.oidc.clientId,
      redirectUri: oiconfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: oiconfig.oidc.issuer,
        scopes: oiconfig.oidc.scopes,
      }
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'
    },
    (response: any) => {
      if(response.status === 'SUCCESS'){
        this.oktaAuth.signInWithRedirect();
      }
    },
    (error: any) => {throw error;}
  );
  }
}
