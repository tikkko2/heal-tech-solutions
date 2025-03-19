import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
  {
    path: '', // Default route
    component: LandingComponent, // Replace with your default component
  },
  {
    path: '**', // Wildcard route for 404 (optional)
    redirectTo: '', // Redirect to the default route
  },
];
