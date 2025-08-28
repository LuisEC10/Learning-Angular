import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  private _idProductEventEmitter: EventEmitter<Number> = new EventEmitter();
  private _productEventEmitter: EventEmitter<Product> = new EventEmitter();


  constructor() { }

  get productEventEmitter(): EventEmitter<Product>{
    return this._productEventEmitter;
  }

  get idProductEventEmitter(): EventEmitter<Number> {
    return this._idProductEventEmitter;
  }
  
  
}
