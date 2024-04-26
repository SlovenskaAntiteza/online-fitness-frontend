import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FitnessNewsComponent } from './components/fitness-news/fitness-news.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { FitnessProgramsComponent } from './components/fitness-programs/fitness-programs.component';
import { ProgramDetailsComponent } from './components/program-details/program-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyProgramsComponent } from './components/my-programs/my-programs.component';
import { NewFitnessProgramComponent } from './components/new-fitness-program/new-fitness-program.component';
import { ParticipateComponent } from './components/participate/participate.component';
import { ChatComponent } from './components/chat/chat.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { AnalyticComponent } from './components/analytic/analytic.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'activate-account',
    component: AccountActivationComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'participate/:id',
        component: ParticipateComponent,
        canActivate: [authGuard],
      },
      {
        path: 'fitness-news',
        component: FitnessNewsComponent,
      },
      {
        path: 'exercises',
        component: ExercisesComponent,
      },
      {
        path: 'fitness-programs',
        component: FitnessProgramsComponent,
      },
      {
        path: 'new-fitness-program',
        component: NewFitnessProgramComponent,
        canActivate: [authGuard],
      },
      {
        path: 'program-details/:id',
        component: ProgramDetailsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
      },
      {
        path: 'my-programs',
        component: MyProgramsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [authGuard],
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'analytic',
        component: AnalyticComponent,
        canActivate: [authGuard],
      },
      {
        path: '',
        redirectTo: 'fitness-news',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
