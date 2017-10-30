import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {WebSocketService} from './websocket.service';

const SERVER_URL = 'wss://api.' + window.location.hostname.replace('dev.', '');

export interface WSPackage {
  method: string;
  type: string;
  data: object;
}

@Injectable()
export class ServerCtrlService {
  public wsPackages: Subject<WSPackage>;

  constructor(wsService: WebSocketService) {
    console.log('I got called');
    if (!this.wsPackages) {
      this.wsPackages = <Subject<WSPackage>>wsService.connect(SERVER_URL)
        .map((response: MessageEvent): WSPackage => {
          console.log(response.data);
          const pack = JSON.parse(response.data);
          return {
            method: pack.method,
            type: pack.type,
            data: pack.data
          };
        });
    }
  }

  send(wsPackage: WSPackage): void {
    this.wsPackages.next(wsPackage);
  }
}
