import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlexibleDestroyComponent } from './flexible-destroy/flexible-destroy.component';

const routes: Routes = [
  {
    path: 'signal',
    component: HomeComponent
  },
  {
    path: 'destroy',
    component: FlexibleDestroyComponent
  },
  {
    path: '**',
    redirectTo: 'signal',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
