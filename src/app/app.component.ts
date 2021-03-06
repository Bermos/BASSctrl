import {Component, OnInit} from '@angular/core';
import {WsHandlerService} from './services/socket/ws-handler.service';
import {Action} from './services/socket/api';
import {MatSnackBar} from '@angular/material';
import {SnackbarService} from './services/snackbar.service';
import {UserService} from './services/user.service';
import {PlayerService} from './services/player.service';
import {Track} from './util/track';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BASS control';
  username: string;
  isAdmin: boolean;
  currentTrack: Track;

  constructor(private wsHandler: WsHandlerService,
              private userService: UserService, private snackBar: MatSnackBar,
              private sb: SnackbarService, private player: PlayerService) {

    wsHandler.appSubject.subscribe(data => {
      if (data.action && data.action === Action.ERROR) {
        this.openSnackBar(data.message, 2000);
      }
      if (data.action && data.action === Action.UPDATE) {
        sb.openSnackbar(data.status);
      }
    });

    sb.getSubject().subscribe(msg => {
      this.openSnackBar(msg.message, msg.duration, msg.action ? msg.action : null);
    });
  }

  ngOnInit(): void {
    this.userService.getUsername()
      .subscribe(username => this.username = username);

    this.userService.isAdmin()
      .subscribe(isAdmin => this.isAdmin = isAdmin);

    this.player.getTrack()
      .subscribe(track => this.currentTrack = track);
  }

  logout(): void {
    this.userService.logout();
  }

  /**
   * This opens a snackbar on the top level view which will always be visible
   *
   * @param {string} message the message to display
   * @param {number} duration how long the message should be visible
   * @param action that should be called when the user clicks on the action
   */
  private openSnackBar(message: string, duration: number, action?: {name: string, callback: () => void}): void {
    if (action) {
      // Open snackbar and get action notifier
      const a = this.snackBar.open(message, action.name, {
        duration: duration,
        verticalPosition: 'top'
      }).onAction();

      // Execute desired action
      a.subscribe(() => {
        action.callback();
      });

    } else {
      // Open snackbar without action
      this.snackBar.open(message, null, {
        duration: duration,
        verticalPosition: 'top'
      });
    }
  }
}
