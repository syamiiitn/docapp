import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PatientregistrationComponent } from './registration/patientregistration/patientregistration.component';
import { DoctorregistrationComponent } from './registration/doctorregistration/doctorregistration.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ForgotpwdComponent } from './nav/forgotpwd/forgotpwd.component';
import { OtpComponent } from './nav/otp/otp.component';
import { ChangepwdComponent } from './nav/changepwd/changepwd.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'nav/home',
    pathMatch: 'full'
  }
  ,
  {
    path: 'nav',
    component:NavComponent,
    children:[
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'aboutus',
        component: AboutusComponent,
      }
      ,
      {
        path: 'doctors',
        component: DoctorsComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path:'forgotpwd',
        component:ForgotpwdComponent
      },
      {
        path:'otp',
        component:OtpComponent
      },
      {
        path:'changepwd',
        component:ChangepwdComponent
      },
      {
        path: 'register',
        component: RegistrationComponent,
        children:[
          {
            path: '',
            redirectTo: 'patient',
            pathMatch: 'full'
          }
          ,
          {
            path: 'patient',
            component: PatientregistrationComponent,
          },
          {
            path: 'doctor',
            component: DoctorregistrationComponent,
          }
        ]
      },
      {
        path:'contactus',
        component:ContactusComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
