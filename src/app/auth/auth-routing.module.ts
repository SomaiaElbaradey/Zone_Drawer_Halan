import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogginAuthGuardService } from '@core/_services/authguard/loggingauth.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent, canActivate: [LogginAuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
