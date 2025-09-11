import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LearnComponent } from './pages/learn/learn.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PracticeComponent } from './pages/practice/practice.component';
import { RevisionComponent } from './pages/revision/revision.component';
import { SupportComponent } from './pages/support/support.component';
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
            {path:'learn',component:LearnComponent,title:'Learn'},
            {path:'profile',component:ProfileComponent,title:'Profile'},
            {path:'practice',component:PracticeComponent,title:'Practice'},
            {path:'revision',component:RevisionComponent,title:'Revision'},
            {path:'support',component:SupportComponent,title:'Support'},
            {path:'**', component:NotfoundComponent,title:'Not Found'}
        ]
    },
];
