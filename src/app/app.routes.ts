import { TutorsdetialsComponent } from './pages/tutorsdetials/tutorsdetials.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged/loged.guard';
import { roleRedirectGuard } from './core/guards/role-redirect/role-redirect.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    canActivate: [logedGuard],
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
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'Home',
      },
      {
        path: 'booksession',
        loadComponent: () =>
          import('./pages/booksession/booksession.component').then(m => m.BooksessionComponent),
        title: 'Booksession',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard',
      },
      {
        path: 'tutor-dashboard',
        loadComponent: () =>
          import('./pages/tutor-dashboard/tutor-dashboard.component').then(m => m.TutorDashboardComponent),
        title: 'Tutor Dashboard',
      },
      {
        path: 'tutors',
        loadComponent: () =>
          import('./pages/tutors/tutors.component').then(m => m.TutorsComponent),
        title: 'Tutors',
      },
      {
        path: 'tutors/:id',
        loadComponent: () =>
          import('./pages/tutorsdetials/tutorsdetials.component').then(m => m.TutorsdetialsComponent),
        title: 'Tutors details',
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
        path: 'notifications',
        loadComponent: () =>
          import('./pages/notifications/notifications.component').then(m => m.NotificationsComponent),
        title: 'Notifications',
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
