import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PracticeComponent } from './pages/practice/practice.component';

import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},

    {path:'',component:AuthLayoutComponent, 
        children:[
            {path:'login',component:LoginComponent,title:'Login'},
            {path:'register',component:RegisterComponent,title:'Register'},
        ]},

    {path:'',component:BlankLayoutComponent,
        children:[
            {path:'home',component:HomeComponent,title:'Home'},
            {path:'dashboard',component:HomeComponent,title:'Dashboard'},
            {path:'tutors',component:HomeComponent,title:'Tutors'},
            {path:'profile',component:ProfileComponent,title:'Profile'},
            {path:'practice',component:PracticeComponent,title:'Practice'},
            {path:'**', component:NotfoundComponent,title:'Not Found'}
        ]
    },
];
