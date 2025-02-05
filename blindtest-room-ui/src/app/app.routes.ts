import { Routes } from '@angular/router';
import { SignInComponent } from './host/sign-in/sign-in.component';
import { LobbyComponent } from './lobby/lobby.component';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './host/overview/overview.component';
import { ControlComponent } from './host/control/control.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'play/:id',
        component: LobbyComponent
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'overview/:id',
        component: OverviewComponent
    },
    {
        path: 'control/:id',
        component: ControlComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
