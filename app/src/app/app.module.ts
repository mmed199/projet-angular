import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ClassesComponent } from './classes/classes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { NgxMaskModule} from 'ngx-mask';
import { InfoClasseComponent } from './classes/info-classe/info-classe.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCoursesComponent } from './courses/add-courses/add-courses.component';
import { AddClasseComponent } from './classes/add-classe/add-classe.component';
import { DndDirective } from './classes/add-classe/dnd.directive';
import { LoginComponent } from './auth/login/login.component';

const routes:Routes = [
  {
    path:"",
    component:ClassesComponent
  },
  {
    path:"home",
    component:ClassesComponent
  },
  {
    path: "classes",
    component : ClassesComponent
  },
  {
    path: "classes/add",
    component : AddClasseComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: "classes/:id",
    component: InfoClasseComponent
  },
  {
    path: "courses/:id",
    component: AddCoursesComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: "login",
    component: LoginComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    RenduDirective,
    ClassesComponent,
    AddClasseComponent,
    DndDirective,
    InfoClasseComponent,
    AddCoursesComponent,
    AddCoursesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule, MatFormFieldModule,
    MatDatepickerModule, MatNativeDateModule,
    MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule,
    FormsModule, HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    NgxCsvParserModule,
    NgxMaskModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
