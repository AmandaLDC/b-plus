import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ExpandListComponent } from './expand-list/expand-list.component';
import { CreateListComponent } from './create-list/create-list.component';
import { UpdateListComponent } from './update-list/update-list.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { RecommendedPageComponent } from './recommended-page/recommended-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchService } from './search/search.service';
import { UserService } from './user/user.service';
import { ApiService } from './api-endpoints/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    HomePageComponent,
    ExpandListComponent,
    CreateListComponent,
    UpdateListComponent,
    BookInfoComponent,
    RecommendedPageComponent,
    SearchPageComponent,
    HelpPageComponent,
    HeaderComponent,
    FooterComponent,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [SearchService, ApiService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
