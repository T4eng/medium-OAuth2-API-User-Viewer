import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';//me
import { HomeComponent } from './home/home.component';//home
   
const routes: Routes = [
 {
    path: "",
    component: HomeComponent  
 },
 {
    path: 'me',//path '/'
    component: AboutComponent
 },
 {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
 }
  
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}