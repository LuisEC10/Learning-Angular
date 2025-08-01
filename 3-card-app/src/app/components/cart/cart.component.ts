import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  @Input() items : CartItem[] = [];
  @Output() idProductEventEmitter = new EventEmitter();
  @Input() total: number = 0;

  onDeletCart(id: number) { 
    this.idProductEventEmitter.emit(id);
  }

}
