import {Component, Input, OnInit} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {WsPackage} from './ws-package';
import {ServerCtrlService} from './server-ctrl.service';
import {WebsocketHandler} from './websocket-handler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    WebsocketService,
    ServerCtrlService
  ]
})
export class AppComponent implements OnInit {
  title = 'BASS control';
  playlist;
  @Input() requestUri: string;

  submitPending = false;
  logginIn = true;

  username;

  constructor(private serverCtrlService: ServerCtrlService) {
    serverCtrlService.wsPackages.subscribe(msg => {
      console.log(msg);

      switch (msg.method) {
        case 'get':
          WebsocketHandler.get(msg);
          break;

        case 'post':
          WebsocketHandler.post(msg);
          break;

        case 'patch':
          WebsocketHandler.patch(msg);
          break;

        case 'delete':
          WebsocketHandler.delete(msg);
          break;
      }
    });
  }

  ngOnInit(): void {
    WebsocketHandler.app = this;
  }

  // Playlist section
  voteTrack(track, vote): void {
    this.serverCtrlService.wsPackages.next(
      new WsPackage('patch', 'track/vote', {
        id: track.id,
        vote: vote
      }));
  }

  public setPlaylist(tracks): void {
    this.playlist = tracks;
  }

  reload(): void {
    // Fetch current track
    this.serverCtrlService.wsPackages.next(
      new WsPackage('get', 'player/current', null));

    // Fetch playlist
    this.serverCtrlService.wsPackages.next(
      new WsPackage('get', 'queue/all', null));

    // Fetch player state
    this.serverCtrlService.wsPackages.next(
      new WsPackage('get', 'player/state', null));
  }

  // Submit section

  submitRequest(): void {
    if (this.requestUri) {
      this.serverCtrlService.wsPackages.next(
         new WsPackage('post', 'queue/uri', {
           uri: this.requestUri
         })
        );
      this.submitPending = true;
    } else {
      alert('Please enter a uri');
    }
  }

  setUsername(username): void {
    this.username = username;
  }

  // TODO remove
  login(): void {
    this.logginIn = true;
  }
}
