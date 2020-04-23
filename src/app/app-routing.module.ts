import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesComponent } from './pages/templates/templates.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';


const routes: Routes = [
  {path: 'template', component: TemplatesComponent},
  {path: 'reactivo', component: ReactiveComponent},
  {path : '**', pathMatch: 'full', redirectTo: 'reactivo' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
