import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then(m => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(m => m.RegisterComponent),
        title: 'Register',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'Home',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard',
      },
      {
        path: 'tutors',
        loadComponent: () =>
          import('./pages/tutors/tutors.component').then(m => m.TutorsComponent),
        title: 'Tutors',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        title: 'Profile',
      },
      {
        path: 'practice',
        loadComponent: () =>
          import('./pages/practice/practice.component').then(m => m.PracticeComponent),
        title: 'Practice',
      },
      {
        path: 'tajweed',
        loadComponent: () =>
          import('./pages/tajweed/tajweed.component').then(m => m.TajweedComponent),
        title: 'Tajweed',
      },
      {
        path: 'tahfiz',
        loadComponent: () =>
          import('./pages/tahfiz/tahfiz.component').then(m => m.TahfizComponent),
        title: 'Tahfiz',
      },
      {
        path: 'memorization',
        loadComponent: () =>
          import('./pages/memorization/memorization.component').then(m => m.MemorizationComponent),
        title: 'Memorization',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent),
        title: 'Not Found',
      },
    ],
  },
];
