import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ProductResolved } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<ProductResolved> {
  constructor(private productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductResolved> {
    const id = Number(route.paramMap?.get('id'));

    if (isNaN(id)) {
      const message = 'Product id is not a number: ' + id;
      return of({ product: null, error: message });
    }
    return this.productService.getProduct(id).pipe(
      map((product) => ({ product })),
      catchError((e) => {
        const message = 'Retrieval error: ' + e;
        console.error(message);
        return of({ product: null, error: message });
      })
    );
  }
}
