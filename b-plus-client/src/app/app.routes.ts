import {Routes} from '@angular/router';
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
import { ConfigPageComponent } from './config-page/config-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: 'login-page', pathMatch: 'full'},
    {path: 'landing-page', component: LandingPageComponent},
    {path: 'login-page', component: LoginPageComponent},
    {path: 'home-page', component: HomePageComponent},
    {path: 'expand-list', component: ExpandListComponent},
    {path: 'create-list', component: CreateListComponent},
    {path: 'update-list', component: UpdateListComponent},
    {path: 'book-info', component: BookInfoComponent},
    {path: 'recommended-page', component: RecommendedPageComponent},
    {path: 'search-page', component: SearchPageComponent},
    {path: 'help-page', component: HelpPageComponent},
    {path: 'config-page', component: ConfigPageComponent},
    {path: 'header', component: HeaderComponent},
    {path: 'footer', component: FooterComponent},
];
