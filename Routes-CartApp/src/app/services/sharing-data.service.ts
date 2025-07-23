import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  private _idProductEventEmitter: EventEmitter<Number> = new EventEmitter();

  constructor() { }

  get idProductEventEmitter() {
    return this._idProductEventEmitter;
  }
  
  
}
