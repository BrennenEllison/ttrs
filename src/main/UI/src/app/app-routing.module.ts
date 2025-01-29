import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { TeeTimeListComponent } from './components/tee-time-list/tee-time-list.component';
import { TeeTimeViewComponent } from './screens/tee-time-view/tee-time-view.component';
import { CheckoutComponent } from './screens/checkout/checkout.component';
import { ConfirmationViewComponent } from './screens/confirmation-view/confirmation-view.component';

import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { ReservationHistory } from './common/reservation-history';
import { ReservationHistoryComponent } from './screens/reservation-history/reservation-history.component';
import { OktaAuth } from '@okta/okta-auth-js';
import oiconfig from './config/oiconfig';
import { formCompletedGuard } from './guard/form-completed.guard';
import { teeTimeSelectedGuard } from './guard/tee-time-selected.guard';
import { ReservationAddonComponent } from './screens/reservation-addon/reservation-addon.component';
import { ReservationComponent } from './screens/reservation/reservation.component';

const oktaConfig = oiconfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
{
  path: 'teetimes',
  component: TeeTimeViewComponent,
  children: [
    {path: 'search', component: TeeTimeListComponent},
    {path: 'search/:id/:status/:startTime/:endTime', component: TeeTimeListComponent},
    {path: '', redirectTo: '/search', pathMatch: 'full'},
    {path: '**', redirectTo: '/search', pathMatch: 'full'} //maybe make this a 404
  ]
},
{path: 'login/callback',component: OktaCallbackComponent},
{path: 'login',component: LoginComponent},

{path: 'checkout',component: CheckoutComponent, canActivate: [teeTimeSelectedGuard]},
{path: 'confirmation', component: ConfirmationViewComponent, canActivate: [formCompletedGuard]},
{path: 'reservation', 
  component: ReservationComponent, 
  canActivate: [OktaAuthGuard],
  data: {onAuthRequired: sendToLoginPage},
  children: [
      {path: 'history', component: ReservationHistoryComponent},
      {path: 'edit/:id', component: ReservationAddonComponent},
      {path: '', redirectTo: '/history', pathMatch: 'full'},
      {path: '**', redirectTo: '/history', pathMatch: 'full'}]},

{path: '', redirectTo: '/teetimes/search', pathMatch: 'full'},
{path: '**', redirectTo: '/teetimes/search'}
];

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector){
  const router = injector.get(Router);
  router.navigate(['/login']);
}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
