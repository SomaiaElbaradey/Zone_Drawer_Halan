import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from '@core/layout/content-layout/content-layout.component';
import { FullLayoutComponent } from '@core/layout/full-layout/full-layout.component';
import { AuthGuard } from '@core/_services/authguard/auth.guard';
import { CONTENT_ROUTES } from '@shared/routes/content-layout.routes';
import { Full_ROUTES } from '@shared/routes/full-layout.routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
