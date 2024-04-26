import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FitnessNewsComponent } from './components/fitness-news/fitness-news.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { FitnessProgramsComponent } from './components/fitness-programs/fitness-programs.component';
import { ProgramDetailsComponent } from './components/program-details/program-details.component';
import { CommentComponent } from './components/comment/comment.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';

import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { MyProgramsComponent } from './components/my-programs/my-programs.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NewFitnessProgramComponent } from './components/new-fitness-program/new-fitness-program.component';
import { StepsModule } from 'primeng/steps';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'primeng/fileupload';
import { FitnessProgramCardComponent } from './components/fitness-program-card/fitness-program-card.component';
import { ParticipateComponent } from './components/participate/participate.component';
import { AskAdvisorComponent } from './components/ask-advisor/ask-advisor.component';
import { ChatComponent } from './components/chat/chat.component';
import { AnalyticComponent } from './components/analytic/analytic.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { CreateMessageComponent } from './components/create-message/create-message.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { ChartModule } from 'primeng/chart';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    FitnessNewsComponent,
    ExercisesComponent,
    FitnessProgramsComponent,
    ProgramDetailsComponent,
    CommentComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccountActivationComponent,
    DefaultLayoutComponent,
    ProfileComponent,
    ChangePasswordComponent,
    MyProgramsComponent,
    NewFitnessProgramComponent,
    FitnessProgramCardComponent,
    ParticipateComponent,
    AskAdvisorComponent,
    ChatComponent,
    AnalyticComponent,
    SubscriptionsComponent,
    CreateMessageComponent,
    AddActivityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    PaginatorModule,
    CardModule,
    AccordionModule,
    BadgeModule,
    DropdownModule,
    CarouselModule,
    TabViewModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    MenuModule,
    MenubarModule,
    DialogModule,
    StepsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FileUploadModule,
    RadioButtonModule,
    AutoCompleteModule,
    TableModule,
    TagModule,
    CalendarModule,
    ChartModule,
    SidebarModule,
  ],
  providers: [
    provideClientHydration(),
    MessageService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
