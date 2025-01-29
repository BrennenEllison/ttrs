import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeeTimeListComponent } from './components/tee-time-list/tee-time-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import {MatDialogModule} from '@angular/material/dialog';

import { FormsModule} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {NativeDateAdapter} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeRangeSelectorComponent } from './components/time-range-selector/time-range-selector.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { TeeTimeService } from './services/tee-time.service';
import { TeeTimeViewComponent } from './screens/tee-time-view/tee-time-view.component';
import { CheckoutComponent } from './screens/checkout/checkout.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import oiconfig from './config/oiconfig';
import { ReservationHistoryListComponent } from './components/reservation-history-list/reservation-history-list.component';
import { ConfirmationViewComponent } from './screens/confirmation-view/confirmation-view.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReservationHistoryComponent } from './screens/reservation-history/reservation-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ReservationHistoryDialogComponent } from './components/reservation-history-dialog/reservation-history-dialog.component';
import { ReservationAddonComponent } from './screens/reservation-addon/reservation-addon.component';
import { ReservationComponent } from './screens/reservation/reservation.component';

const oktaConfig = oiconfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    AppComponent,
    TeeTimeListComponent,
    DatePickerComponent,
    TimeRangeSelectorComponent,
    TeeTimeViewComponent,
    CheckoutComponent,
    ReservationFormComponent,
    LoginComponent,
    LoginStatusComponent,
    ReservationHistoryListComponent,
    ConfirmationViewComponent,
    ReservationHistoryComponent,
    ReservationHistoryDialogComponent,
    ReservationAddonComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    OktaAuthModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [NativeDateAdapter, 
              TeeTimeService,
              {provide: OKTA_CONFIG, useValue: {oktaAuth}},
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
