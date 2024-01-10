import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout/layout.component';
import { LoginComponent } from './Auth/login/login.component';
import { AuthGuard } from './Auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'Layout',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./component/dashboard/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'addnewuser',
        loadChildren: () =>
          import('./component/Addnewuser/addnewuser/addnewuser.module').then(
            (m) => m.AddnewuserModule
          ),
      },
      // { path: 'uikit', loadChildren: () => import('').then(m => m.EmployeedetailModule) },
      // { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
      // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
      // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
      // { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
