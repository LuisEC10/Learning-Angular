import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { add, remove, total } from '../store/items.action';

@Component({
  selector: 'cart-app',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit{

  items: CartItem[] = [];
  total: number = 0;

  constructor(
    private store: Store<{items: ItemsState}>,
    private router: Router,
    private sharingDataService: SharingDataService) {
      this.store.select('items').subscribe(state => {
        this.items = state.items;
        this.total = state.total;
        this.saveSession();
      })
  }
  
  ngOnInit(): void {
    this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product => {
      this.store.dispatch(add({product: product}));
      this.store.dispatch(total());
      this.router.navigate(['/cart'], {
        state: {items: this.items, total: this.total},
      });

      Swal.fire({
        title: "Shopping",
        text: "Nuevo producto agregado al carro!",
        icon: "success"
      });
    });
  }

  onDeleteCart(): void { 
    this.sharingDataService.idProductEventEmitter.subscribe((id:number) => {
      Swal.fire({
        title: "Estás seguro que desea eliminar?",
        text: "Cuidado el item se eliminará del carro de compras!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí,eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({id})); 
          this.store.dispatch(total());         
          
          this.router.navigateByUrl('/', {
            skipLocationChange: true,
          }).then(() => {
            this.router.navigate(['/cart'], {
              state: {items: this.items, total: this.items}
            })
          }); 
          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado el item del carrito de compras.",
            icon: "success"
          });
        }
      });
    })
  }

  saveSession(): void { 
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
