import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path:'',
    loadChildren:  () => import('../../feature-module/zones/zones.module').then(m => m.ZonesModule)
  },
];
