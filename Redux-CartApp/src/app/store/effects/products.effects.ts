import { inject, Injectable } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { findAll, load } from "../products.action";
import { exhaustMap} from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ProductsEffects {
    
    private actions$ = inject(Actions);
    private service = inject(ProductService)
 
    loadProduct$ = createEffect(
      () => {return this.actions$.pipe(
        ofType(load),
        exhaustMap(() => this.service.findAll())
      ).pipe(
        map(products => (findAll({products : products})))
      )
    }
    )
    
}