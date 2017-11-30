import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './views/login.component';
import {PlayerComponent} from './views/player.component';
import {MainViewComponent} from './views/main-view.component';
import {RegisterComponent} from './views/register.component';
import {QueueComponent} from './views/queue.component';
import {FavoritesComponent} from './views/favorites.component';

import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieService} from 'angular2-cookie/core';
import {SnackbarService} from './services/snackbar.service';
import {UserService} from './services/user.service';
import {WsHandlerService} from './services/socket/ws-handler.service';
import {WebSocketService} from './services/socket/websocket.service';
import {UpdateComponent} from './views/update.component';
import {TrackService} from './services/track.service';
import {FavoriteService} from './services/favorite.service';
import {QueueService} from './services/queue.service';

RouterModule.forRoot([
  {
    path: 'login',
    component: LoginComponent
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    RegisterComponent,
    PlayerComponent,
    QueueComponent,
    LoginComponent,
    UpdateComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableModule,
    MatGridListModule,
    MatExpansionModule,
    MatTooltipModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'favorites',
        component: FavoritesComponent
      },
      {
        path: 'update',
        component: UpdateComponent
      },
      {
        path: 'main',
        component: MainViewComponent
      },
      {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
    CookieService,
    WebSocketService,
    WsHandlerService,
    UserService,
    SnackbarService,
    QueueService,
    TrackService,
    FavoriteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
