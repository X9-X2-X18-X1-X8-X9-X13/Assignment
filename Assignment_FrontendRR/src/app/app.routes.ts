import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { MyQuotesComponent } from './components/my-quotes/my-quotes.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'components/books', component: BookListComponent },
    { path: 'components/my-quotes', component: MyQuotesComponent },
    { path: 'components/login', component: LoginComponent},
    { path: '', redirectTo: 'components/books', pathMatch: 'full' }  // Optionally add a default route

];
