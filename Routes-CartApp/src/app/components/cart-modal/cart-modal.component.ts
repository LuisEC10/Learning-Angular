import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart-modal',
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
})
export class CartModalComponent {
  @Input() items : CartItem[] = [];
  @Input() total: number = 0;

  @Output() openCartEmitter = new EventEmitter();
  @Output() idProductEventEmitter = new EventEmitter();

  onDeleteCart(id: number) { 
    this.idProductEventEmitter.emit(id);
  }

  openCart(): void {
    this.openCartEmitter.emit();
  }
}
