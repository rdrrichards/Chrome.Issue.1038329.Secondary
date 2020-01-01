import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentationReceiverService {
  private urlSubject: Subject<string> = new Subject<string>();
  url$ = this.urlSubject.asObservable();

  constructor() { }
  receiverReady() {
    if (navigator.presentation.receiver) {
      navigator.presentation.receiver.connectionList.then(list => {
        list.connections.map(connection => this.addConnection(connection));
        list.addEventListener('connectionavailable', (event) => {
          console.log('connectionavailable', event.receiver);
          this.addConnection(event.connection);
        });
      });
    }
  }

  addConnection(connection) {
    connection.addEventListener('message', (event) => {
      console.log('message receiver event', event);
      const data = JSON.parse(event.data);
      if (data.thing.url) {
        console.log('we need to show this: ', data.thing.url);
        this.urlSubject.next(data.thing.url);
      }
    });
  }
}
