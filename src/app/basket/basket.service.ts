import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Customer } from '../customer/customer.types';
import { ApiService } from '../shared/services/api.service';
import { BasketItem } from './basket.types';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  basketItems: BasketItem[] = [];

  get basketTotal(): number {
    return this.basketItems.reduce((total, { price }) => total + price, 0);
  }

  getNumberOfItems(): number {
    return this.basketItems.length;
  }

  private apiService = inject(ApiService);

  fetch(): Observable<BasketItem[]> {
    return this.apiService.getBasket().pipe(tap((basketItems) => (this.basketItems = basketItems)));
  }

  addItem(productId: string): Observable<BasketItem> {
    return this.apiService.addToBasket(productId).pipe(tap((item) => (this.basketItems = [...this.basketItems, item])));
  }

  checkoutBasket(customer: Customer): Observable<{ orderNumber: number }> {
    return this.apiService.checkoutBasket(customer).pipe(tap(() => (this.basketItems = [])));
  }
}
