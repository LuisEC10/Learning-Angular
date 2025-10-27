import { Routes } from '@angular/router';
import { UserComponent } from './components/user.component/user.component';
import { UserFormComponent } from './components/user-form.component/user-form.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/users'
    },
    {
        path: 'users',
        component: UserComponent,
    },
    {
        path: 'users/create',
        component: UserFormComponent,
    },
    {
        path: 'users/edit/:id',
        component: UserFormComponent,
    }
];
