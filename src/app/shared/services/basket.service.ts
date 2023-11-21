import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from '../../basket/basket.types';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  readonly basePath = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  getTotal(basketItems: BasketItem[]): number {
    let total = 0;
    basketItems.forEach((basketItem) => {
      total += basketItem.price;
    });

    return total;
  }

  getNumberOfItems(basketItems: BasketItem[]): number {
    return basketItems.length;
  }

  fetch(): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>(`${this.basePath}/api/basket`);
  }

  addItem(productId: string): Observable<BasketItem> {
    return this.httpClient.post<BasketItem>(`${this.basePath}/api/basket`, { productId });
  }
}
