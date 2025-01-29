import { environment } from 'src/environments/environment.prod';


export default{
    oidc: {
        clientId: window.env.OKTA_OAUTH2_CLIENT_ID,
        issuer: window.env.OKTA_OAUTH2_ISSUER,
        redirectUri: environment.reUI,
        scopes: ['openid', 'profile', 'email']
    }

}
